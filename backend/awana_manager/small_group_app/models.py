from django.db import models


# Create your models here.
class SmallGroup(models.Model):
    leader_id = models.IntegerField()
    class_id = models.IntegerField()
