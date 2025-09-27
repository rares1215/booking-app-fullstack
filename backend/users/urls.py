from django.urls import path
from . import views

urlpatterns = [
    path("profile/", views.UpdateProfileView.as_view(), name = "user-profile"),
    path("profile/<str:username>/", views.PublicProfile.as_view(), name="public-profile")
]