import json
from django.http import JsonResponse
from .models import Class
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import Class
from .serializers import ClassSerializer


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer


@csrf_exempt
def get_classes():
    classes = list(Class.objects.values())
    return JsonResponse(classes, safe=False)


@csrf_exempt
def create_class(request):
    data = json.loads(request.body)
    new_class = Class.objects.create(
        name=data["name"],
        leader_id=data["leader_id"],
    )
    return JsonResponse(
        {
            "status": "success",
            "data": {
                "id": new_class.id,
                "name": new_class.name,
                "leader_id": new_class.leader_id,
            },
        }
    )


@csrf_exempt
def update_class(request, class_id):
    data = json.loads(request.body)
    Class.objects.filter(id=class_id).update(
        name=data["name"], leader_id=data.get("leader_id")
    )
    return JsonResponse({"status": "success", "data": data})


@csrf_exempt
def delete_class(class_id):
    Class.objects.filter(id=class_id).delete()
    return JsonResponse({"status": "success"})
