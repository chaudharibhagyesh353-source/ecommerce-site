"""
Django settings for ecommerce_project project.
Updated for Graduate Brand - Feb 2026
"""
import cloudinary
from pathlib import Path
import os
from dotenv import load_dotenv
import dj_database_url

# -------------------------------

# BASE DIRECTORY

# -------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

# ✅ Load .env file

load_dotenv(BASE_DIR / ".env")

# -------------------------------

# SECURITY

# -------------------------------

SECRET_KEY = os.getenv("SECRET_KEY")


DEBUG = os.getenv("DEBUG") == "True"
ALLOWED_HOSTS = [
     "127.0.0.1",
    "localhost",
    ".onrender.com",
    "graduatekapadewala.com",
    "www.graduatekapadewala.com",
]
SITE_ID = 1
# -------------------------------

# INSTALLED APPS

# -------------------------------

INSTALLED_APPS = [
'django.contrib.admin',
'django.contrib.auth',
'django.contrib.contenttypes',
'django.contrib.sessions',
'django.contrib.messages',
'django.contrib.staticfiles',
'django.contrib.sites',
'django.contrib.sitemaps',
# Custom App
'shop',

# Allauth Apps
'allauth',
'allauth.account',
'allauth.socialaccount',
#'allauth.socialaccount.providers.google',

# Cloudinary
'cloudinary',
'cloudinary_storage',

]

# -------------------------------

# MIDDLEWARE

# -------------------------------

MIDDLEWARE = [
'django.middleware.security.SecurityMiddleware',
'whitenoise.middleware.WhiteNoiseMiddleware',
'django.contrib.sessions.middleware.SessionMiddleware',
'django.middleware.common.CommonMiddleware',
'django.middleware.csrf.CsrfViewMiddleware',
'django.contrib.auth.middleware.AuthenticationMiddleware',
'django.contrib.messages.middleware.MessageMiddleware',
'django.middleware.clickjacking.XFrameOptionsMiddleware',
'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'ecommerce_project.urls'

# -------------------------------

# TEMPLATES

# -------------------------------

TEMPLATES = [
{
'BACKEND': 'django.template.backends.django.DjangoTemplates',
'DIRS': [BASE_DIR / 'templates'],
'APP_DIRS': True,
'OPTIONS': {
'context_processors': [
'django.template.context_processors.debug',
'django.template.context_processors.request',
'django.contrib.auth.context_processors.auth',
'django.contrib.messages.context_processors.messages',
],
},
},
]

WSGI_APPLICATION = 'ecommerce_project.wsgi.application'

# -------------------------------

# DATABASE

# -------------------------------

DATABASES = {
    'default': dj_database_url.config(
        default=os.getenv("DATABASE_URL"),
        conn_max_age=600
    )
}

# -------------------------------

# INTERNATIONALIZATION

# -------------------------------

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# -------------------------------

# STATIC & MEDIA FILES

# -------------------------------

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "shop/static",
]

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = '/media/'

# ✅ Django 5 Storage System (IMPORTANT)
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# =========================================================

# ✅ ALLAUTH CONFIGURATION (UPDATED — NO WARNINGS)

# =========================================================

# ✅ ALLAUTH CONFIGURATION (CLEAN & ERROR-FREE)
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1

LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# ✅ Updated settings to fix (account.W001)
ACCOUNT_AUTHENTICATION_METHOD = 'email'  # Use email to login
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False        # Email-only login
ACCOUNT_EMAIL_VERIFICATION = 'none'      # Skip verification for now

# -------------------------------

# SOCIAL ACCOUNT PROVIDERS

# -------------------------------



# =========================================================
# 💳 RAZORPAY PAYMENT GATEWAY
# =========================================================

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# =========================================================
# ☁️ CLOUDINARY CONFIGURATION
# =========================================================


cloudinary.config(
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key = os.getenv("CLOUDINARY_API_KEY"),
    api_secret = os.getenv("CLOUDINARY_API_SECRET"),
)
