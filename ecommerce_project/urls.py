"""
URL configuration for ecommerce_project project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path

from django.contrib.sitemaps.views import sitemap
from shop.sitemaps import ProductSitemap
from django.views.generic import TemplateView


sitemaps = {
    'products': ProductSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Allauth URLs
    path('accounts/', include('allauth.urls')),
    
    # Shop URLs
    path('', include('shop.urls')),

    # robots.txt
    path("robots.txt", TemplateView.as_view(
        template_name="shop/robots.txt",
        content_type="text/plain"
    )),

    # sitemap.xml
    path("sitemap.xml", sitemap, {'sitemaps': sitemaps}),
]


# ✅ SERVE MEDIA FILES DURING DEVELOPMENT ONLY
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

    urlpatterns += static(
        settings.STATIC_URL,
        document_root=settings.STATIC_ROOT
    )

# OPTIONAL local fallback (har production me zaruri nahi)
if settings.DEBUG:
    urlpatterns += [
        re_path(
            r'^media/(?P<path>.*)$',
            serve,
            {'document_root': settings.MEDIA_ROOT}
        ),
    ]