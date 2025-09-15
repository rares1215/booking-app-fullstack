from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Event(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("canceled", "Canceled"),
        ("finished", "finished"),
    ]

    title = models.CharField(max_length=150)
    description = models.TextField()
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="organized_events")
    date = models.DateTimeField()
    location = models.TextField()
    capacity = models.PositiveIntegerField(blank=True, null=True)
    participants = models.ManyToManyField(User, related_name="events_joined", blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="active")

    def __str__(self):
        return f"{self.title} by {self.organizer.username} on {self.date}"
    
