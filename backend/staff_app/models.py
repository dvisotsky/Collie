from django.db import models


# Create your models here.
class Staff(models.Model):
    name = models.CharField(max_length=50)
    groups = models.ManyToManyField('Group')
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
