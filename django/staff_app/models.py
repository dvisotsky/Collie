from django.db import models


# Create your models here.
class Staff(models.Model):
    name = models.CharField(max_length=50)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Group(models.Model):
    staff_ids = models.ManyToManyField("Staff", blank=True)
    name = models.CharField(max_length=50)
    members = models.ManyToManyField("GroupMember", blank=True)

    def __str__(self):
        return self.name


class GroupMember(models.Model):
    name = models.CharField(max_length=50)
    group_id = models.ForeignKey("Group", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name
