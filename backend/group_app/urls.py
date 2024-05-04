from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ClassViewSet

router = DefaultRouter()
router.register(r"groups", ClassViewSet)

urlpatterns = [
    path("", include("group_app.urls")),
]
