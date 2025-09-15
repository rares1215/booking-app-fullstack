from django.shortcuts import render
from .serializers import EventSerializer
from .models import Event
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated

# Create your views here.

class EventsListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self,serializer):
        serializer.save(organizer = self.request.user)
