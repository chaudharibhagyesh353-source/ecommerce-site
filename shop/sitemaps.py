from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Product

class StaticViewSitemap(Sitemap):
    priority = 1.0
    changefreq = "daily"

    def items(self):
        return ["home", "shop"]

    def location(self, item):
        return reverse(item)


class ProductSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8
    protocol = "https"

    def items(self):
        return Product.objects.all()

    def location(self, obj):
        return reverse("product_detail", kwargs={"slug": obj.slug})

    def get_domain(self, site=None):
        return "graduatekapadewala.com"