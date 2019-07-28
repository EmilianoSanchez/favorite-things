from django.urls import path, include
from rest_framework.routers import DefaultRouter
from restapi import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'favorite-things', views.FavoriteThingViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'metadatas', views.MetadataViewSet)
router.register(r'enums', views.EnumViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

