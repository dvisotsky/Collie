# Generated by Django 5.0.3 on 2024-05-08 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='members',
            field=models.ManyToManyField(blank=True, to='staff_app.groupmember'),
        ),
    ]