from rest_framework import serializers

from restapi.models import FavoriteThing, Category


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['url', 'id', 'name']


class FavoriteThingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FavoriteThing
        fields = ['url', 'id', 'title', 'description', 'ranking', 'category', 'category_id', 'created_date', 'modified_date']
