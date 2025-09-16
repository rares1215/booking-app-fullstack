from rest_framework import serializers
from .models import Event,Comment
from django.utils import timezone


#### Serializer for events #########
class EventSerializer(serializers.ModelSerializer):
    organizer = serializers.SlugRelatedField(
        read_only=True,
        slug_field="username"
    )
    participants = serializers.SlugRelatedField(
        slug_field="username",
        many=True,
        read_only=True
    )
    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "organizer",
            "date",
            "location",
            "capacity",
            "participants",
            "status"
        ]
        extra_kwargs = {"organizer": {"read_only":True}}

    def validate(self,attrs):
        user = self.context["request"].user

        ### Validation for user to be organizer ###

        if user.profile.role!="organizer":
            raise serializers.ValidationError({"organizer" : "Only organizers can organize events!"})

        ### Checking for participants to not be greater than max_participants###

        max_participants = attrs.get("capacity")
        participants = attrs.get("participants")

        if max_participants and participants and len(participants)> max_participants:
            raise serializers.ValidationError({"max_participants": "Participants can't exceed the capacity!"})

        #### Check for the date to not be in the past!

        date = attrs.get("date")
        today = timezone.now()

        if date < today:
            raise serializers.ValidationError({"date" : "The date can't be in the past!"})

        return attrs


#### Serializer on Comments####

class CommentSerializer(serializers.ModelSerializer):
    event = serializers.SlugRelatedField(
        slug_field="title",
        read_only=True
    )
    user = serializers.SlugRelatedField(
        slug_field="username",
        read_only=True
    )
    class Meta:
        model = Comment
        fields = [
            'id',
            'event',
            'user',
            'title',
            'content',
            'created_at',
        ]
        extra_kwargs = {"created_at":{"read_only":True}}