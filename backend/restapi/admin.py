# todo/admin.py

from django.contrib import admin
from .models import FavoriteThing, Category, Metadata, Enum


class FavoriteThingAdmin(admin.ModelAdmin):
    model = FavoriteThing


class CategoryAdmin(admin.ModelAdmin):
    model = Category


class MetadataAdmin(admin.ModelAdmin):
    model = Metadata


class EnumAdmin(admin.ModelAdmin):
    model = Enum


admin.site.register(FavoriteThing, FavoriteThingAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Metadata, MetadataAdmin)
admin.site.register(Enum, EnumAdmin)
