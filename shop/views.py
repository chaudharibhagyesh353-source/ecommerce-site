import razorpay
from django.conf import settings
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Product, Category, Size, Color, Review, Order, OrderItem, ProductImage, UserProfile, Subscriber
from django.utils.text import slugify
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Q  # ✅ Added Q for search functionality
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from decimal import Decimal
import json

# --- PUBLIC VIEWS ---

def home(request):
    # ✅ UPDATE: Added prefetch_related to prevent 'Image has no file' errors
    featured_products = Product.objects.filter(is_featured=True).prefetch_related('images')[:4]
    
    # ✅ UPDATE: Added Best Sellers list for the index.html section
    best_sellers = Product.objects.filter(is_bestseller=True).prefetch_related('images')[:4]
    
    latest_arrivals = Product.objects.order_by('-created_at')[:8]  # ✅ New: Latest arrivals
    reviews = Review.objects.filter(rating=5)[:3]
    
    context = {
        'featured_products': featured_products,
        'best_sellers': best_sellers,  # ✅ New Context Variable
        'latest_arrivals': latest_arrivals,
        'reviews': reviews
    }
    return render(request, 'shop/index.html', context)

def shop(request):
    # ✅ UPDATE: Prefetch images here as well for smoother loading
    products = Product.objects.all().prefetch_related('images')
    categories = Category.objects.all()
    sizes = Size.objects.all().order_by('sort_order')
    colors = Color.objects.all()
    
    # ✅ Localized Price Ranges (INR ₹)
    price_ranges = [
      { "label": "Under ₹500", "min": 0, "max": 500 },
      { "label": "₹500 - ₹1500", "min": 500, "max": 1500 },
      { "label": "₹1500 - ₹3000", "min": 1500, "max": 3000 },
      { "label": "Over ₹3000", "min": 3000, "max": 999999 },
    ]
    
    # ✅ Feature: Search Bar Logic
    query = request.GET.get('q')
    if query:
        products = products.filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query) |
            Q(categories__name__icontains=query)
        )

    category_slug = request.GET.get('category')
    size_slug = request.GET.get('size')
    color_slug = request.GET.get('color')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    sort_by = request.GET.get('sort')

    if category_slug and category_slug != 'all':
        products = products.filter(categories__slug=category_slug)
    if size_slug:
        products = products.filter(sizes__slug=size_slug)
    if color_slug:
        products = products.filter(colors__slug=color_slug)
    if min_price and max_price:
        products = products.filter(price__gte=min_price, price__lte=max_price)

    if sort_by == 'price-asc':
        products = products.order_by('price')
    elif sort_by == 'price-desc':
        products = products.order_by('-price')
    elif sort_by == 'newest':
        products = products.order_by('-created_at')

    products = products.distinct()

    context = {
        'products': products,
        'categories': categories,
        'sizes': sizes,
        'colors': colors,
        'priceRanges': price_ranges,
        'query': query
    }
    return render(request, 'shop/shop.html', context)

def product_detail(request, id):
    # ✅ UPDATE: Added prefetch_related to stop the Internal Server Error on missing images
    product = get_object_or_404(Product.objects.prefetch_related('images'), id=id)
    
    # ✅ Feature: Handle Review Submission
    if request.method == 'POST' and request.user.is_authenticated:
        Review.objects.create(
            product=product,
            author_name=request.user.username,
            rating=int(request.POST.get('rating', 5)),
            text=request.POST.get('text'),
            is_verified=True
        )
        return redirect('product_detail', id=product.id)

    related_products = Product.objects.filter(
        categories__in=product.categories.all()
    ).exclude(id=id).prefetch_related('images').distinct()[:4]
    
    reviews = product.reviews.all().order_by('-created_at')
    sizes = product.sizes.all().order_by('sort_order')

    context = {
        'product': product,
        'related_products': related_products,
        'reviews': reviews,
        'sizes': sizes
    }
    return render(request, 'shop/product_detail.html', context)

def cart(request):
    return render(request, 'shop/cart.html')

@csrf_exempt
def checkout(request):
    user_profile = None
    if request.user.is_authenticated:
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            order = Order.objects.create(
                first_name=data.get('firstName') or data.get('first_name'),
                last_name=data.get('lastName') or data.get('last_name'),
                email=data.get('email'),
                phone=data.get('phone'),
                address=data.get('address'),
                city=data.get('city'),
                state=data.get('state'),
                zip_code=data.get('zipCode') or data.get('zip_code'),
                payment_method=data.get('payment', 'Cod'),
                total_amount=Decimal(str(data.get('totalAmount')))
            )
            payment_id = data.get("payment_id")
            if payment_id:
                order.payment_id = payment_id
                order.is_paid = True
                order.save()

            if request.user.is_authenticated:
                order.user = request.user
                order.save()
                
                if user_profile:
                    user_profile.phone = data.get('phone')
                    user_profile.address = data.get('address')
                    user_profile.city = data.get('city')
                    user_profile.state = data.get('state')
                    user_profile.zip_code = data.get('zipCode') or data.get('zip_code')
                    user_profile.save()

            for item in data.get('cart', []):
                product = Product.objects.get(id=item.get('id'))
                qty_purchased = int(item.get('quantity'))

                # ✅ AUTOMATIC STOCK REDUCTION Logic
                if product.stock_count >= qty_purchased:
                    product.stock_count -= qty_purchased
                    product.save()

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    price=Decimal(str(item.get('price'))),
                    quantity=qty_purchased,
                    selected_size=item.get('selectedSize')
                )
            
            return JsonResponse({'status': 'success', 'order_id': order.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return render(request, 'shop/checkout.html', {'profile': user_profile})

# --- AUTH VIEWS ---

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if user.is_staff:
                return redirect('admin_dashboard')
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'shop/auth/login.html', {'form': form})

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'shop/auth/register.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('home')

@login_required
def profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)

    if request.method == 'POST':
        user_profile.phone = request.POST.get('phone')
        user_profile.address = request.POST.get('address')
        user_profile.city = request.POST.get('city')
        user_profile.state = request.POST.get('state')
        user_profile.zip_code = request.POST.get('zip_code')
        user_profile.save()
        return redirect('profile')
    
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    return render(request, 'shop/profile.html', {'orders': orders, 'profile': user_profile})

# --- DASHBOARD VIEWS ---

@staff_member_required
def admin_dashboard(request):
    today = timezone.now().date()
    week_start = today - timedelta(days=today.weekday())
    month_start = today.replace(day=1)

    daily_sales = Order.objects.filter(created_at__date=today).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    weekly_sales = Order.objects.filter(created_at__date__gte=week_start).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    monthly_sales = Order.objects.filter(created_at__date__gte=month_start).aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    
    recent_orders = Order.objects.order_by('-created_at')[:5]
    
    # ✅ Feature: Low Stock Alert (Products with less than 5 units)
    low_stock_products = Product.objects.filter(stock_count__lt=5)

    context = {
        'daily_sales': daily_sales,
        'weekly_sales': weekly_sales,
        'monthly_sales': monthly_sales,
        'recent_orders': recent_orders,
        'low_stock_products': low_stock_products
    }
    return render(request, 'shop/dashboard/index.html', context)

@staff_member_required
def dashboard_products(request):
    products = Product.objects.all().order_by('-created_at')
    return render(request, 'shop/dashboard/product_list.html', {'products': products})

@staff_member_required
def dashboard_product_add(request):
    categories = Category.objects.all()
    sizes = Size.objects.all().order_by('sort_order')
    colors = Color.objects.all()

    if request.method == 'POST':
        # 1. Create Basic Product
        product = Product.objects.create(
            name=request.POST.get('name'),
            description=request.POST.get('description'),
            price=Decimal(request.POST.get('price')),
            stock_count=int(request.POST.get('stock_count', 0)), 
            off_percentage=int(request.POST.get('off_percentage') or 0),
            slug=slugify(request.POST.get('name')),
            in_stock=request.POST.get('in_stock') == 'on',
            is_featured=request.POST.get('is_featured') == 'on',
            is_bestseller=request.POST.get('is_bestseller') == 'on'
        )
        
        # 2. Set Relations
        product.categories.set(request.POST.getlist('categories'))
        product.sizes.set(request.POST.getlist('sizes'))
        selected_colors = request.POST.getlist('colors')
        product.colors.set(selected_colors)

        # 3. Handle General Images (No Color)
        general_files = request.FILES.getlist('general_images')
        for i, img_file in enumerate(general_files):
            # First general image becomes "Main" if no other images exist
            is_main = (i == 0)
            ProductImage.objects.create(product=product, image=img_file, is_main=is_main)

        # 4. ✅ NEW: Handle Color-Specific Images
        for color_id in selected_colors:
            input_name = f'color_images_{color_id}'
            color_files = request.FILES.getlist(input_name)
            for img_file in color_files:
                ProductImage.objects.create(
                    product=product, 
                    image=img_file, 
                    color_id=color_id 
                )

        return redirect('dashboard_products')

    return render(request, 'shop/dashboard/product_form.html', {
        'categories': categories, 'sizes': sizes, 'colors': colors
    })

@staff_member_required
def dashboard_product_edit(request, pk):
    product = get_object_or_404(Product, pk=pk)
    categories = Category.objects.all()
    sizes = Size.objects.all().order_by('sort_order')
    colors = Color.objects.all()
    
    if request.method == 'POST':
        # 1. Update Basic Fields
        product.name = request.POST.get('name')
        product.price = Decimal(request.POST.get('price'))
        product.stock_count = int(request.POST.get('stock_count', 0)) 
        product.off_percentage = int(request.POST.get('off_percentage') or 0)
        product.description = request.POST.get('description')
        product.in_stock = request.POST.get('in_stock') == 'on'
        product.is_featured = request.POST.get('is_featured') == 'on'
        product.is_bestseller = request.POST.get('is_bestseller') == 'on'
        product.save()

        # 2. Handle Deletion
        delete_ids = request.POST.get('delete_images')
        if delete_ids:
            for img_id in delete_ids.split(','):
                ProductImage.objects.filter(id=img_id, product=product).delete()

        # 3. Update Relations
        product.categories.set(request.POST.getlist('categories'))
        product.sizes.set(request.POST.getlist('sizes'))
        selected_colors = request.POST.getlist('colors')
        product.colors.set(selected_colors)

        # 4. Handle General Images (No Color)
        for img_file in request.FILES.getlist('general_images'):
            ProductImage.objects.create(product=product, image=img_file)

        # 5. ✅ NEW: Handle Color-Specific Images
        for color_id in selected_colors:
            input_name = f'color_images_{color_id}'
            color_files = request.FILES.getlist(input_name)
            for img_file in color_files:
                ProductImage.objects.create(
                    product=product, 
                    image=img_file, 
                    color_id=color_id 
                )

        return redirect('dashboard_products')
        
    return render(request, 'shop/dashboard/product_form.html', {
        'product': product, 'categories': categories, 'sizes': sizes, 'colors': colors
    })

# --- ORDER MANAGEMENT ---

@staff_member_required
def dashboard_orders(request):
    orders = Order.objects.all().order_by('-created_at')
    return render(request, 'shop/dashboard/orders.html', {'orders': orders})

@staff_member_required
def mark_order_shipped(request, order_id):
    if request.method == 'POST':
        order = get_object_or_404(Order, id=order_id)
        if order.status in ['Pending', 'Processing']:
            order.status = 'Shipped'
            order.save()
            return JsonResponse({'status': 'success', 'message': 'Order marked as shipped'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

# --- STATIC PAGES ---

def about(request):
    return render(request, 'shop/about.html')

def contact(request):
    return render(request, 'shop/contact.html')

def subscribe(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if email:
            Subscriber.objects.get_or_create(email=email)
            return JsonResponse({'status': 'success', 'message': 'Subscribed successfully!'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

# =========================================================
# 💳 CREATE RAZORPAY PAYMENT ORDER
# =========================================================

@csrf_exempt
def create_payment_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Amount received from frontend
            amount = int(float(data.get("amount")) * 100)  # ₹ → paise

            # Razorpay client
            client = razorpay.Client(
                auth=(
                    settings.RAZORPAY_KEY_ID,
                    settings.RAZORPAY_KEY_SECRET
                )
            )

            # Create Razorpay order
            payment_order = client.order.create({
                "amount": amount,
                "currency": "INR",
                "payment_capture": 1
            })

            return JsonResponse({
                "status": "success",
                "order_id": payment_order["id"],
                "amount": amount,
                "key": settings.RAZORPAY_KEY_ID
            })

        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": str(e)
            })