# todo/admin.py

from django.contrib import admin
from .models import FavoriteThing  # add this


class FavoriteThingAdmin(admin.ModelAdmin):  # add this
    model = FavoriteThing


# Register your models here.
admin.site.register(FavoriteThing, FavoriteThingAdmin)  # add this
