from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from restapi.models import FavoriteThing
from restapi.serializers import FavoriteThingSerializer

@csrf_exempt
def favoritething_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        favoritethings = FavoriteThing.objects.all()
        serializer = FavoriteThingSerializer(favoritethings, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = FavoriteThingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def favoritething_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        favoritething = FavoriteThing.objects.get(pk=pk)
    except FavoriteThing.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = FavoriteThingSerializer(favoritething)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = FavoriteThingSerializer(favoritething, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        favoritething.delete()
        return HttpResponse(status=204)