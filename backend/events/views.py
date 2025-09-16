from django.shortcuts import render
from .serializers import EventSerializer
from .models import Event
from rest_framework import generics,response,status
from rest_framework.permissions import AllowAny,IsAuthenticated
from .permisions import IsOrganizerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import EventsFilter

# Create your views here.

class EventsListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
        ]
    filterset_class = EventsFilter
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['date', 'status' , 'capacity']
    ordering = ['date']

    def perform_create(self,serializer):
        serializer.save(organizer = self.request.user)

class EditDeleteEventsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated,IsOrganizerOrReadOnly]


class JoinLeaveEvent(generics.GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def post(self,request,pk):
        event = self.get_object()


        if event.capacity and event.participants.count() >= event.capacity:
            return response.Response({"error": "Event is full!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if event.participants.filter(id=request.user.id).exists():
            return response.Response(
                {"error": "You've already joined the event!"},
                status=status.HTTP_400_BAD_REQUEST
            )
        event.participants.add(request.user)
        return response.Response({"success" : f"You've joined {event.title}"}, status=status.HTTP_200_OK)

    def delete(self,request,pk):
        event = self.get_object()
        
        if not event.participants.filter(id=request.user.id).exists():
            return response.Response({"error": "You can t leave an event if you're not joined!"}, status=status.HTTP_400_BAD_REQUEST)

        event.participants.remove(request.user)
        return response.Response({"success" : f"You've left {event.title}"}, status=status.HTTP_200_OK)
