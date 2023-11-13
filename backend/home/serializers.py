from .models import Post, Comments
from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "avatar", "posts")
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "email", "avatar", "posts")

class PostCommentsSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    is_author = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comments
        fields = ('id', 'body', 'author', 'is_author')
    def get_is_author(self, obj):
        return obj.author == self.context["request"].user

# PROD useless serializer below
class GetDebugCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'body', 'author', 'post')
        read_only_fields = ("author", "post")
        depth=1
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comments
        fields = ('id', 'body')
class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'body', "post")

class PostSerializer(serializers.ModelSerializer):
    # created_at = serializers.DateTimeField(read_only=True)
    author = UserSerializer(read_only=True)
    comments = PostCommentsSerializer(many=True, read_only=True)

    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    is_author = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', "likes", 'is_liked', 'author', 'is_author', 'created_at', 'comments', 'image')

    def get_likes(self, obj):
        return obj.get_likes()
    def get_is_liked(self, obj):
        user = self.context["request"].user
        return obj.is_liked_by(user)
    def get_is_author(self,obj):
        user = self.context["request"].user
        return obj.author == user
class EditPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'image')
class ListPostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', "thumbnail")

    def get_thumbnail(self, obj):
        # PROD change to domain name
        return "http://127.0.0.1:8000" + obj.thumbnail.url


