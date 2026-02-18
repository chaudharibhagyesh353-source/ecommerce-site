from django.core.management.base import BaseCommand
from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site

class Command(BaseCommand):
    help = 'Creates dummy Social Apps for Google, Facebook, and GitHub to prevent template errors'

    def handle(self, *args, **kwargs):
        # Ensure site exists
        site, created = Site.objects.get_or_create(id=1, defaults={'domain': '127.0.0.1:8000', 'name': 'E-commerce'})
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created Site: {site}'))
        else:
            site.domain = '127.0.0.1:8000'
            site.name = 'E-commerce'
            site.save()
            self.stdout.write(self.style.SUCCESS(f'Updated Site: {site}'))

        providers = [
            {'provider': 'google', 'name': 'Google Auth', 'client_id': 'dummy-google-client-id', 'secret': 'dummy-google-secret'},
            {'provider': 'facebook', 'name': 'Facebook Auth', 'client_id': 'dummy-facebook-client-id', 'secret': 'dummy-facebook-secret'},
            {'provider': 'github', 'name': 'GitHub Auth', 'client_id': 'dummy-github-client-id', 'secret': 'dummy-github-secret'},
        ]

        for p in providers:
            app, created = SocialApp.objects.get_or_create(
                provider=p['provider'],
                defaults={
                    'name': p['name'],
                    'client_id': p['client_id'],
                    'secret': p['secret'],
                }
            )
            if created:
                app.sites.add(site)
                self.stdout.write(self.style.SUCCESS(f"Created SocialApp: {p['name']}"))
            else:
                self.stdout.write(self.style.WARNING(f"SocialApp already exists: {p['name']}"))
                if not app.sites.filter(id=site.id).exists():
                     app.sites.add(site)
                     self.stdout.write(self.style.SUCCESS(f"Added site to SocialApp: {p['name']}"))
