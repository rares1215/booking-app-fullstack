from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


#### The models for creating Events ##########
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

    def update_status_if_finished(self):
        if self.status != "finished" and self.date < timezone.now():
            self.status = "finished"
            self.save(update_fields=["status"])
        return self.status


#### The model For creating Comments on Events ###############
class Comment(models.Model):

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.title} by {self.user} on {self.event}"
    


    
