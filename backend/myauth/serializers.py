import random

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from django.contrib.auth import get_user_model
from django.apps import apps
from django.contrib.auth.password_validation import validate_password


Post = apps.get_model('home', 'Post')

class ListPostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField()

    class Meta:
        model = Post
        fields = ('id', 'title', "thumbnail")



UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()
    posts = ListPostSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "avatar", "posts", "likes", "followers", "following", "is_followed")
        # TODO make it use lookup field of slug
        # lookup_field = 'username'

    def get_followers(self, obj):
        return obj.followers.count()

    def get_following(self, obj):
        return obj.following.count()

    def get_is_followed(self, obj):
        if not self.context["request"].user.is_authenticated:
            return False
        return obj.is_followed_by(self.context["request"].user)

    def get_likes(self, obj):
        return obj.get_total_likes()


def validate_username(username):
    errors = []
    if " " in username:
        errors.append("Username must not contain spaces")
    if len(username) <= 2:
        errors.append("Username must be at least 3 characters long")
    if not username:
        errors.append("Username must not be empty")
    if errors == []:
        return username
    raise ValidationError(errors)


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"
    def create(self, data):
        # if data.get("username", "") == "":
        #     data["username"] = random_username_from_name(data.get("name"))
        user_obj = UserModel.objects.create_user(name=data['name'], username=data['username'], email=data['email'], password=data['password'])
        return user_obj
    def validate_password(self, password):
        validate_password(password)
        return password
    def validate_username(self, username):
        return validate_username(username)
class MyUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()

    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "email", "avatar")
    def validate_username(self, username):
        return validate_username(username)