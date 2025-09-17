from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import RegisterSerializer,ProfileSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Profile

# Create your views here.

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class UpdateProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return Profile.objects.get(user=user)

