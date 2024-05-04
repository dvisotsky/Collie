import json
from django.http import JsonResponse
from .models import Group
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import Group
from .serializers import ClassSerializer


class ClassViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = ClassSerializer


