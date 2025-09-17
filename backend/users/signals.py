from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from .models import Profile


@receiver(post_save,sender=User)
def profile_for_user(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
        user=instance, 
        first_name=instance.first_name,
        last_name = instance.last_name
        )
    else:
        instance.profile.save()
