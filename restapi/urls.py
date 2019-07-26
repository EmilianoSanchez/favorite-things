from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from restapi import views

urlpatterns = [
    path('favorite-things/', views.favoritething_list),
    path('favorite-things/<int:pk>/', views.favoritething_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)