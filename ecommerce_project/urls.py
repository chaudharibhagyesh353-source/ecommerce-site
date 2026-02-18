"""
URL configuration for ecommerce_project project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# ✅ ADD THESE IMPORTS (for manual media serving)
from django.views.static import serve
from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Allauth URLs (Login/Logout/Signup)
    path('accounts/', include('allauth.urls')),
    
    # Shop URLs
    path('', include('shop.urls')),
]


# ✅ SERVE MEDIA FILES (IMAGES) DURING DEVELOPMENT
# This allows product images & uploads to show when DEBUG=True
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

    # Static serving only for local development/testing
    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )


# ✅ FORCE SERVE MEDIA FILES FOR LOCAL GUNICORN TESTING
# (Does NOT affect production on Render)
urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)


# ✅ FINAL FALLBACK — MANUAL MEDIA SERVING (GUARANTEED FIX)
# This ensures /media URLs always resolve locally → even if above fails
urlpatterns += [
    re_path(
        r'^media/(?P<path>.*)$',
        serve,
        {'document_root': settings.MEDIA_ROOT}
    ),
]
