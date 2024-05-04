from django.core.management.base import BaseCommand
from group_app.models import Group


class Command(BaseCommand):
    help = "Seeds the database with classes"

    def handle(self, *args, **options):
        classes = [
            Group(name="Cubbies"),
            Group(name="Sparks"),
            Group(name="T&T"),
            Group(name="Trek"),
        ]
        for c in classes:
            c.save()
            self.stdout.write(self.style.SUCCESS(f"Added class {c.name}"))
