from .models import Group, Staff, GroupMember
from rest_framework import viewsets
from .serializers import GroupSerializer, StaffSerializer, GroupMemberSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset(self):
        return Group.objects.all().prefetch_related("staff_ids")


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class GroupMemberViewSet(viewsets.ModelViewSet):
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer
