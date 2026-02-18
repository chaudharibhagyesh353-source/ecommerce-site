from django.core.management.base import BaseCommand
from shop.models import Category, Size, Color, Product, ProductImage, ProductFeature, Review
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Loads initial mock data with Sorted Sizes and Multi-Categories'

    def handle(self, *args, **kwargs):
        self.stdout.write('Loading data...')
        
        # 1. Wipe old data to avoid conflicts
        Review.objects.all().delete()
        ProductFeature.objects.all().delete()
        ProductImage.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        Size.objects.all().delete()
        Color.objects.all().delete()

        # 2. Create Categories
        # We store them in a dictionary for easy access later: {'Men': <Category Object>, ...}
        category_names = ["Men", "Women", "New Arrivals", "Best Sellers", "Accessories"]
        cat_objs = {}
        for name in category_names:
            cat = Category.objects.create(name=name)
            cat_objs[name] = cat
        self.stdout.write(f'Created Categories: {", ".join(category_names)}')

        # 3. Create Sorted Sizes
        # sort_order ensures XS appears before XL in the UI
        sizes_data = [
            ("XS", 1), 
            ("S", 2), 
            ("M", 3), 
            ("L", 4), 
            ("XL", 5), 
            ("XXL", 6)
        ]
        size_objs = {}
        for name, order in sizes_data:
            size = Size.objects.create(name=name, sort_order=order)
            size_objs[name] = size
        self.stdout.write('Created Sorted Sizes')
        
        # 4. Create Colors
        colors = ["Black", "White", "Blue", "Red", "Beige", "Green", "Navy"]
        color_objs = {}
        for name in colors:
            color = Color.objects.create(name=name)
            color_objs[name] = color

        # 5. Define Products Data
        products_data = [
            {
                "name": "Essential White Tee",
                "categories": ["Men", "Best Sellers"],
                "price": 29.99,
                "off_percentage": 0,
                "description": "Our essential white tee is crafted from premium 100% organic cotton. Designed with a modern fit and reinforced stitching, this versatile piece is perfect for layering or wearing solo.",
                "rating": 4.8,
                "review_count": 127,
                "images": [
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
                ],
                "features": ["100% Organic Cotton", "Pre-shrunk fabric", "Modern fit"],
                "is_featured": True,
                "is_bestseller": True,
            },
            {
                "name": "Classic Denim Jacket",
                "categories": ["Men", "New Arrivals"],
                "price": 89.99,
                "off_percentage": 20,
                "description": "Timeless denim jacket featuring a classic cut with modern details. Made from premium denim with just the right amount of stretch for comfort.",
                "rating": 4.6,
                "review_count": 89,
                "images": [
                    "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80",
                ],
                "features": ["Premium stretch denim", "Button closure", "4 pockets"],
                "is_featured": True,
                "is_bestseller": False,
            },
            {
                "name": "Elegant Evening Dress",
                "categories": ["Women", "Best Sellers"],
                "price": 120.00,
                "off_percentage": 10,
                "description": "A stunning evening dress designed for special occasions. Features a flattering silhouette and premium silk-blend fabric.",
                "rating": 5.0,
                "review_count": 42,
                "images": [
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
                ],
                "features": ["Silk blend", "Floor length", "Hidden zipper"],
                "is_featured": True,
                "is_bestseller": True
            },
            {
                "name": "Urban Streetwear Hoodie",
                "categories": ["Men", "New Arrivals"],
                "price": 65.00,
                "off_percentage": 0,
                "description": "Heavyweight cotton hoodie with a relaxed oversized fit. Perfect for the urban explorer.",
                "rating": 4.7,
                "review_count": 22,
                "images": [
                    "https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=800&q=80",
                ],
                "features": ["Heavyweight cotton", "Oversized fit", "Kangaroo pocket"],
                "is_featured": False,
                "is_bestseller": False,
            },
            {
                "name": "Summer Floral Sundress",
                "categories": ["Women", "New Arrivals"],
                "price": 45.50,
                "off_percentage": 15,
                "description": "Lightweight and breezy sundress with a vibrant floral pattern. Perfect for beach days or brunch.",
                "rating": 4.5,
                "review_count": 18,
                "images": [
                    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
                ],
                "features": ["Breathable fabric", "Adjustable straps"],
                "is_featured": True,
                "is_bestseller": False,
            },
            {
                "name": "Minimalist Leather Watch",
                "categories": ["Accessories", "Best Sellers"],
                "price": 150.00,
                "off_percentage": 0,
                "description": "A sleek, minimalist watch with a genuine leather strap and sapphire crystal glass.",
                "rating": 4.9,
                "review_count": 56,
                "images": [
                    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
                ],
                "features": ["Genuine Leather", "Water resistant", "Sapphire glass"],
                "is_featured": False,
                "is_bestseller": True,
            }
        ]

        # 6. Create Products Loop
        for p_data in products_data:
            product = Product.objects.create(
                name=p_data['name'],
                price=p_data['price'],
                off_percentage=p_data.get('off_percentage', 0),
                description=p_data['description'],
                rating=p_data.get('rating', 0),
                review_count=p_data.get('review_count', 0),
                is_featured=p_data.get('is_featured', False),
                is_bestseller=p_data.get('is_bestseller', False)
            )
            
            # Add Categories (Many-to-Many)
            for cat_name in p_data.get('categories', []):
                if cat_name in cat_objs:
                    product.categories.add(cat_objs[cat_name])

            # Add Images
            for i, img_url in enumerate(p_data['images']):
                ProductImage.objects.create(
                    product=product,
                    image_url=img_url,
                    is_main=(i==0)
                )

            # Add Features
            for feature in p_data.get('features', []):
                ProductFeature.objects.create(
                    product=product,
                    text=feature
                )
            
            # Add All Sizes & Colors to every product for demo purposes
            product.sizes.set(Size.objects.all())
            product.colors.set(Color.objects.all()[:4]) # First 4 colors
            
            self.stdout.write(f'Created product: {product.name}')

        self.stdout.write(self.style.SUCCESS('Data setup complete!'))