import datetime
import re

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


# patternType = re.compile("^(Text|Date|Number|Enum)$")


# def valid_types(value):
#     if not patternType.match(value):
#         raise serializers.ValidationError(
#             'This field must be one of the following values: "Text", "Date", "Number" or "Enum"')


def valid_date(date_text):
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
    except ValueError:
        raise serializers.ValidationError({"value": "Incorrect date format. Should be YYYY-MM-DD."})


def valid_number(value):
    try:
        float(value)
    except ValueError:
        raise serializers.ValidationError({"value": "Incorrect date format. Should be a number."})


def valid_enum(enum, value):
    if enum is None:
        raise serializers.ValidationError({"enum": "When type field is Enum, enum field may not be blank."})
    if value not in enum.values.split(","):
        raise serializers.ValidationError({"value": f"Value must be one of {enum.name} enum values: {enum.values}"})


class MetadataSerializer(serializers.HyperlinkedModelSerializer):
    # type = serializers.CharField(validators=[valid_types])
    class Meta:
        model = Metadata
        fields = ['url', 'id', 'key', 'type', 'enum', 'value', 'favorite_thing', 'favorite_thing_id']

    def validate(self, data):
        """
        Validate Enum and Value fields according to Type field.
        """
        {
            'Text': lambda data: None,
            'Date': lambda data: valid_date(data['value']),
            'Number': lambda data: valid_number(data['value']),
            'Enum': lambda data: valid_enum(data["enum"], data['value']),
        }[data['type']](data)
        return data


pattern = re.compile("^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$")


def list_of_strings(value):
    # if not isinstance(value, str) or not pattern.match(value):
    if not pattern.match(value):
        raise serializers.ValidationError(
            'This field must be an string with a comma separated list of values, such as "value1,value2,valueN".')


class EnumSerializer(serializers.HyperlinkedModelSerializer):
    values = serializers.CharField(validators=[list_of_strings])

    class Meta:
        model = Enum
        fields = ['url', 'id', 'name', 'values']
