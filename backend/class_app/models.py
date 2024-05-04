from django.db import models


# Create your models here.
class Class(models.Model):
    name = models.CharField(max_length=50)
    leader_id = models.IntegerField(null=True)
