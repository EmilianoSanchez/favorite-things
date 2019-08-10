from auditlog.models import LogEntry
from rest_framework import viewsets
from restapi.models import FavoriteThing, Category, Metadata, Enum
from restapi.serializers import FavoriteThingSerializer, CategorySerializer, MetadataSerializer, EnumSerializer, LogEntrySerializer


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


class MetadataViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Metadata.objects.all()
    serializer_class = MetadataSerializer


class EnumViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Enum.objects.all()
    serializer_class = EnumSerializer


class LogEntryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = LogEntry.objects.all()
    serializer_class = LogEntrySerializer
