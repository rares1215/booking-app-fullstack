from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from datetime import date, timedelta




class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        read_only = True,
        slug_field = "username"
    )
    class Meta:
        model = Profile
        fields = [
            "id", 
            "user",
            "avatar",
            "bio",
            "role",
            "birthday",
            "first_name",
            "last_name",
            ]
        extra_kwargs = {"user":{"read_only":True}}

    def validate(self,attrs):
        birthday = attrs.get("birthday") or self.instance.birthday
        role = attrs.get("role") or self.instance.role

        if role=="organizer" and birthday:
            today = date.today()

            age = today.year - birthday.year - ((today.month, today.day) < (birthday.month, birthday.day))

            if age<18:
                raise serializers.ValidationError({"role" : "You must be atleast 18 years old to be an organizer!"})
        return attrs



class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["id","email", "first_name" , 'last_name',"username","password","password2"]
        extra_kwargs = {"password": {"write_only":True}}

    def validate(self,attrs):
        if attrs["password"]!=attrs["password2"]:
            raise serializers.ValidationError({"password": "Both passwords must match!"})
        if len(attrs["password"]) <10:
            raise serializers.ValidationError({"password": "password must be longer then 10 characters!"})
        return attrs

    def validate_email(self,value):
        email = User.objects.filter(email=value)
        if email:
            raise serializers.ValidationError({"email" : "An account with this email already exists!"})
        return value

    def create(self,validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user