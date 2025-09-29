from django.shortcuts import render
from .serializers import EventSerializer,CommentSerializer
from .models import Event,Comment
from rest_framework import generics,response,status,serializers
from rest_framework.permissions import AllowAny,IsAuthenticated
from .permisions import IsOrganizerOrReadOnly,IsOwnerOrReadOnly
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
        filters.OrderingFilter,
        ]
    filterset_class = EventsFilter
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['date', 'status' , 'capacity']
    ordering = ['status']

    def perform_create(self,serializer):
        serializer.save(organizer = self.request.user)
    def get_queryset(self):
        events = Event.objects.all()
        for event in events.filter(status="active"):
            event.update_status_if_finished()
        return events

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

        if event.status == "finished":
            return response.Response({"error" : "You can't join a finished event!"}, status=status.HTTP_400_BAD_REQUEST)

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
        event.update_status_if_finished()

        if not event.participants.filter(id=request.user.id).exists():
            return response.Response({"error": "You can t leave an event if you're not joined!"}, status=status.HTTP_400_BAD_REQUEST)

        event.participants.remove(request.user)
        return response.Response({"success" : f"You've left {event.title}"}, status=status.HTTP_200_OK)


######### view for Comments on Events######

class EventCommentsView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.OrderingFilter,
    ]
    ordering = ["-created_at"]

    def get_queryset(self):
        event_id  = self.kwargs.get("pk")
        return Comment.objects.filter(event_id=event_id)
    def perform_create(self,serializer):
        event_id = self.kwargs.get("pk")
        event = Event.objects.get(pk=event_id)
        event.update_status_if_finished()

        if self.request.user not in event.participants.all():
            raise serializers.ValidationError({"error": "You can't comment on this event! You did not participate in it!"})
        if event.status !="finished":
            raise serializers.ValidationError({"error" : "You can't comment on this event beacuse the event is not finished."})
        serializer.save(user=self.request.user, event=event)

class EditDeleteCommentsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrReadOnly]
