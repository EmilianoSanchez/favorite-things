# todo/admin.py

from django.contrib import admin
from .models import FavoriteThing, Category


class FavoriteThingAdmin(admin.ModelAdmin):
    model = FavoriteThing


class CategoryAdmin(admin.ModelAdmin):
    model = Category


admin.site.register(FavoriteThing, FavoriteThingAdmin)
admin.site.register(Category, CategoryAdmin)
