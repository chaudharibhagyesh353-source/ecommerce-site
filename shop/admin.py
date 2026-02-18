from django.contrib import admin
from .models import (
    Category, Product, ProductImage, ProductFeature, 
    Review, Size, Color, Order, OrderItem, UserProfile, Subscriber
)

# --- INLINES ---

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 1

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    # Ensuring order data remains consistent after payment
    readonly_fields = ('product', 'price', 'quantity', 'selected_size')

# --- ADMIN CLASSES ---

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # Added 'is_paid' and 'payment_id' to list_display for payment visibility
    list_display = (
        'id', 
        'first_name', 
        'last_name', 
        'email', 
        'total_amount', 
        'status', 
        'is_paid',      # Shows payment status (check/cross)
        'payment_id',   # Shows Razorpay Payment ID
        'created_at'
    )
    # Added 'is_paid' filter to quickly track completed transactions
    list_filter = ('status', 'is_paid', 'created_at')
    # Added 'payment_id' to search for specific transactions
    search_fields = ('first_name', 'last_name', 'email', 'id', 'payment_id')
    inlines = [OrderItemInline]
    # Allows marking orders as paid directly from the list view
    list_editable = ('status', 'is_paid') 

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # ✅ UPDATE: Added 'is_bestseller' to list_display and list_editable for quick updates
    list_display = ('name', 'get_categories', 'price', 'stock_count', 'in_stock', 'is_featured', 'is_bestseller')
    list_editable = ('price', 'stock_count', 'in_stock', 'is_featured', 'is_bestseller')
    
    list_filter = ('categories', 'in_stock', 'is_featured', 'is_bestseller')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductFeatureInline]

    # Displays ManyToMany categories as a comma-separated string
    def get_categories(self, obj):
        return ", ".join([c.name for c in obj.categories.all()])
    get_categories.short_description = 'Categories'

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'author_name', 'rating', 'created_at', 'is_verified')
    list_filter = ('rating', 'is_verified', 'created_at')
    search_fields = ('product__name', 'author_name', 'text')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'city', 'state')
    search_fields = ('user__username', 'phone', 'city')

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    search_fields = ('email',)

# --- SIMPLE REGISTRATIONS ---

admin.site.register(Size)
admin.site.register(Color)
admin.site.register(OrderItem)