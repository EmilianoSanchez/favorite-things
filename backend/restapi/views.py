from rest_framework import viewsets
from restapi.models import FavoriteThing, Category
from restapi.serializers import FavoriteThingSerializer, CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FavoriteThingViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = FavoriteThing.objects.all()
    serializer_class = FavoriteThingSerializer
