from django.urls import path
from . import views

urlpatterns = [
    # --- Public Pages ---
    path('', views.home, name='home'),
    path('shop/', views.shop, name='shop'),

    # ✅ UPDATED: SEO Friendly Product URL (Slug Based)
    path('product/<slug:slug>/', views.product_detail, name='product_detail'),

    path('cart/', views.cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    
    # --- Payment & Actions ---
    path('create-payment-order/', views.create_payment_order, name='create_payment_order'),
    path('subscribe/', views.subscribe, name='subscribe'),

    # --- Dashboard ---
    path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('dashboard/products/', views.dashboard_products, name='dashboard_products'),
    path('dashboard/products/add/', views.dashboard_product_add, name='dashboard_product_add'),
    path('dashboard/products/<int:pk>/edit/', views.dashboard_product_edit, name='dashboard_product_edit'),
    path('dashboard/orders/', views.dashboard_orders, name='dashboard_orders'),
    path('dashboard/orders/<int:order_id>/shipped/', views.mark_order_shipped, name='mark_order_shipped'),

    # --- Auth & Profile ---
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile, name='profile'),
]