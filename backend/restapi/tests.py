from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from restapi.models import Category, FavoriteThing, Enum, Metadata

from restapi.serializers import CategorySerializer, FavoriteThingSerializer, EnumSerializer


class CategoryTests(APITestCase):
    fixtures = ['fixtures/fixture.json']

    def test_create_category(self):
        """
        Test for creating a new Category object.
        The resulting number of categories is 4, since the database contain 3 initial Categories.
        """
        url = reverse('category-list')  # '/api/categories/'
        data = {'name': 'NewCategory'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 4)


class FavoriteThingTests(APITestCase):
    fixtures = ['fixtures/fixture.json']

    def test_create_favorite_thing(self):
        """
        Test for creating a new Favorite Thing object.
        """
        category = Category.objects.get(name="food")
        serialized_category = CategorySerializer(category, context={'request': None})
        data = {
            'title': 'New Favorite Thing',
            'description': 'New description',
            'ranking': 1,
            'category': serialized_category.data.get('url'),
        }
        url = reverse('favoritething-list')  # '/api/favorite-things/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FavoriteThing.objects.count(), 1)

    def test_create_invalid_favorite_thing_short_description(self):
        """
        Test for attempting to create a new Favorite Thing object with a description with less than 10 characters.
        """
        category = Category.objects.get(name="food")
        serialized_category = CategorySerializer(category, context={'request': None})
        data = {
            'title': 'New Favorite Thing',
            'description': 'Short',
            'ranking': 1,
            'category': serialized_category.data.get('url'),
        }
        url = reverse('favoritething-list')  # '/api/favorite-things/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(FavoriteThing.objects.count(), 0)

    def test_create_a_second_favorite_thing_with_existing_ranking(self):
        """
        Test for creating two Favorite Thing objects with the same ranking.
        The ranking of the first object is incremented.
        """
        category = Category.objects.get(name="food")
        serialized_category = CategorySerializer(category, context={'request': None})
        category_url = serialized_category.data.get('url')
        data1 = {
            'title': 'New Favorite Thing 1',
            'description': 'New description',
            'ranking': 1,
            'category': category_url,
        }
        data2 = {
            'title': 'New Favorite Thing 2',
            'description': 'New description',
            'ranking': 1,
            'category': category_url,
        }
        url = reverse('favoritething-list')  # '/api/favorite-things/'
        response = self.client.post(url, data1, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FavoriteThing.objects.count(), 1)
        response = self.client.post(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FavoriteThing.objects.count(), 2)
        rankings = {FavoriteThing.objects.all()[0].ranking, FavoriteThing.objects.all()[1].ranking}
        self.assertEqual(rankings, {1, 2})


class EnumTests(APITestCase):
    fixtures = ['fixtures/fixture.json']

    def test_create_enum(self):
        """
        Test for creating a new Enum object.
        """
        url = reverse('enum-list')  # '/api/categories/'
        data = {
            'name': 'NewEnum',
            'values': 'Value1,Value2,Value3',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Enum.objects.count(), 1)

    def test_create_invalid_enum(self):
        """
        Test for attempting to create a new Enum object without a comma separated list of values.
        """
        url = reverse('enum-list')  # '/api/categories/'
        data = {
            'name': 'NewEnum',
            'values': 'Value1 ,Val ue2, Value3',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Enum.objects.count(), 0)


def create_favorite_thing(title, description, ranking, category_name):
    """
    Create a question with the given `question_text` and published the
    given number of `days` offset to now (negative for questions published
    in the past, positive for questions that have yet to be published).
    """
    category = Category.objects.get(name=category_name)
    favorite_thing = FavoriteThing.objects.create(title=title, description=description, ranking=ranking,
                                                  category=category)
    serialized_favorite_thing = FavoriteThingSerializer(favorite_thing, context={'request': None})
    return serialized_favorite_thing.data.get('url')


def create_enum(name, values):
    """
    Create a question with the given `question_text` and published the
    given number of `days` offset to now (negative for questions published
    in the past, positive for questions that have yet to be published).
    """
    enum = Enum.objects.create(name=name, values=values)
    serialized_enum = EnumSerializer(enum, context={'request': None})
    return serialized_enum.data.get('url')


class MetadataTests(APITestCase):
    fixtures = ['fixtures/fixture.json']

    def test_create_text_metadata_entry(self):
        """
        Test for creating a new Metadata entry object of type Text.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Text",
            "enum": None,
            "value": "New metadata value",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Metadata.objects.count(), 1)

    def test_create_invalid_text_metadata_entry(self):
        """
        Test for attempting to create a new Metadata entry object of type Text with an empty text value.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Text",
            "enum": None,
            "value": "",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Metadata.objects.count(), 0)

    def test_create_number_metadata_entry(self):
        """
        Test for creating a new Metadata entry object of type Number.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Number",
            "enum": None,
            "value": "1.0",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Metadata.objects.count(), 1)

    def test_create_invalid_number_metadata_entry(self):
        """
        Test for attempting to create a new Metadata entry object of type Number with an invalid number value.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Number",
            "enum": None,
            "value": "asd1.0",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Metadata.objects.count(), 0)

    def test_create_date_metadata_entry(self):
        """
        Test for creating a new Metadata entry object of type Date.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Date",
            "enum": None,
            "value": "1999-10-10",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Metadata.objects.count(), 1)

    def test_create_invalid_date_metadata_entry(self):
        """
        Test for attempting to create a new Metadata entry object of type Date with an invalid date value.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Date",
            "enum": None,
            "value": "asd1.0",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Metadata.objects.count(), 0)

    def test_create_enum_metadata_entry(self):
        """
        Test for creating a new Metadata entry object of type Enum.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        enum_url = create_enum("New enum", "Value1,Value2")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Enum",
            "enum": enum_url,
            "value": "Value1",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Metadata.objects.count(), 1)

    def test_create_invalid_enum_metadata_entry_empty_enum(self):
        """
        Test for attempting to create a new Metadata entry object of type Enum with an empty Enum type.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Enum",
            "enum": None,
            "value": "Value1",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Metadata.objects.count(), 0)

    def test_create_invalid_enum_metadata_entry_invalid_value(self):
        """
        Test for attempting to create a new Metadata entry object of type Enum with an empty Enum type.
        """
        favorite_thing_url = create_favorite_thing("New favorite thing", "Description", 1, "food")
        enum_url = create_enum("New enum", "Value1,Value2")
        url = reverse('metadata-list')  # '/api/categories/'
        data = {
            "key": "New metadata key",
            "type": "Enum",
            "enum": enum_url,
            "value": "Value3",
            "favorite_thing": favorite_thing_url,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Metadata.objects.count(), 0)
