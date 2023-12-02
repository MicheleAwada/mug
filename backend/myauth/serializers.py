from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.apps import apps
from django.contrib.auth.password_validation import validate_password

Post = apps.get_model('home', 'Post')

UserModel = get_user_model()


class ListPostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', "thumbnail")

    def get_thumbnail(self, obj):
        # PROD change to domain name
        return "http://127.0.0.1:8000" + obj.thumbnail.url



class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    posts = ListPostSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    is_followed = serializers.SerializerMethodField()
    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "avatar", "posts", "likes", "followers", "following", "is_followed")
        # TODO make it use lookup field of slug
        #lookup_field = 'username'
    def get_followers(self, obj):
        return obj.followers.count()
    def get_following(self, obj):
        return obj.following.count()
    def get_is_followed(self, obj):
        return obj.is_followed_by(self.context["request"].user)
    def get_likes(self, obj):
        return obj.get_total_likes()


    # PROD change domain
    def get_avatar(self, obj):
        return "http://127.0.0.1:8000" + obj.avatar.url

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"
    def create(self, data):
        user_obj = UserModel.objects.create_user(name=data['name'], username=data['username'], email=data['email'], password=data['password'])
        return user_obj
    def validate_password(self, password):
        validate_password(password)
        return password
class MyUserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "email", "avatar")

    # PROD change domain
    def get_avatar(self, obj):
        return "http://127.0.0.1:8000" + obj.avatar.url