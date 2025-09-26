from django.db import models
from django.contrib.auth.models import User


### Profile made for every user ##

class Profile(models.Model):
    ROLE_CHOICES = [
        ("organizer", "Organizer"),
        ("attendee","Attendee"),
    ]
    user = models.OneToOneField(User,on_delete=models.CASCADE, related_name="profile")
    avatar =  models.ImageField(upload_to="avatars/", blank = True , null = True)
    bio = models.TextField(blank=True, null=True)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, blank=True, null=True, default="attendee")
    birthday = models.DateField(blank=True,null=True)
    first_name = models.CharField(max_length = 150, blank = True)
    last_name = models.CharField(max_length = 150, blank = True)


    def __str__(self):
        return f"{self.user.username} Profile"
    

