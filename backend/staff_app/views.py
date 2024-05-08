from .models import Group, Staff, GroupMember
from rest_framework import viewsets
from .serializers import GroupSerializer, StaffSerializer, GroupMemberSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class StaffViewSet(viewsets.ModelViewSet):
    serializer_class = StaffSerializer
    def get_queryset(self):
        queryset = Staff.objects.all()
        queryset = queryset.prefetch_related('group_set')
        return queryset

class GroupMemberViewSet(viewsets.ModelViewSet):
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer

