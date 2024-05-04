from django.core.management.base import BaseCommand
from class_app.models import Class


class Command(BaseCommand):
    help = "Seeds the database with classes"

    def handle(self, *args, **options):
        classes = [
            Class(name="Cubbies"),
            Class(name="Sparks"),
            Class(name="T&T"),
            Class(name="Trek"),
        ]
        for c in classes:
            c.save()
            self.stdout.write(self.style.SUCCESS(f"Added class {c.name}"))
