from rest_framework import viewsets
from restapi.models import FavoriteThing
from restapi.serializers import FavoriteThingSerializer


class FavoriteThingViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = FavoriteThing.objects.all()
    serializer_class = FavoriteThingSerializer
