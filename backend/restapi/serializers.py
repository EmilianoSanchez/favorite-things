from rest_framework import serializers

from restapi.models import FavoriteThing, Category, Metadata, Enum


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['url', 'id', 'name']


class FavoriteThingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FavoriteThing
        fields = ['url', 'id', 'title', 'description', 'ranking', 'category', 'category_id', 'created_date', 'modified_date']


class MetadataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Metadata
        fields = ['url', 'id', 'key', 'type', 'enum', 'value', 'favorite_thing']


class EnumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Enum
        fields = ['url', 'id', 'name', 'values']
