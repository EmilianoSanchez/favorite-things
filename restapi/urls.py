from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from restapi import views

urlpatterns = format_suffix_patterns([
    path('', views.api_root),
    path('favorite-things/', views.favoritething_list, name='favorite-thing-list'),
    path('favorite-things/<int:pk>/', views.favoritething_detail, name='favorite-thing-detail'),
])

