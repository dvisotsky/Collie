from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ClassViewSet

router = DefaultRouter()
router.register(r"classes", ClassViewSet)

urlpatterns = [
    path("", include("class_app.urls")),
]
