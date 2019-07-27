from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from restapi.models import FavoriteThing
from restapi.serializers import FavoriteThingSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'favorite-things': reverse('favorite-thing-list', request=request, format=format)
    })

@api_view(['GET', 'POST'])
def favoritething_list(request, format=None):
    """
    List all code snippets, or create a new favorite thing.
    """
    if request.method == 'GET':
        favorite_things = FavoriteThing.objects.all()
        serializer = FavoriteThingSerializer(favorite_things, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FavoriteThingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def favoritething_detail(request, pk, format=None):
    """
    Retrieve, update or delete a favorite thing.
    """
    try:
        favorite_thing = FavoriteThing.objects.get(pk=pk)
    except FavoriteThing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FavoriteThingSerializer(favorite_thing)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FavoriteThingSerializer(favorite_thing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        favorite_thing.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)