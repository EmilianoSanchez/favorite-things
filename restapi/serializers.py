from rest_framework import serializers

from restapi.models import FavoriteThing


class FavoriteThingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FavoriteThing
        fields = ['url', 'id', 'title', 'description', 'ranking', 'category']
