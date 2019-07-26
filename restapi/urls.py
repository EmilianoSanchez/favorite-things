from django.urls import path
from restapi import views

urlpatterns = [
    path('favorite-things/', views.favoritething_list),
    path('favorite-things/<int:pk>/', views.favoritething_detail),
]