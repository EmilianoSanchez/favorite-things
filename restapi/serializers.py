from rest_framework import serializers

from restapi.models import FavoriteThing


class FavoriteThingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteThing
        fields = ['id', 'title', 'description', 'ranking']
