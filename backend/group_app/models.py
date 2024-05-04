from django.db import models


# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=50, unique=True)
    leader_id = models.IntegerField(null=True)

class GroupMember(models.Model):
    name = models.CharField(max_length=50)
    class_id = models.IntegerField()
    group_id = models.IntegerField()
    leader = models.BooleanField(default=False)
    age = models.IntegerField()
    grade = models

