# Generated by Django 4.2.3 on 2024-02-24 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SmallGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leader_id', models.IntegerField()),
                ('class_id', models.IntegerField()),
            ],
        ),
    ]
