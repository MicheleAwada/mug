from .models import Post, Comments
from rest_framework import serializers
from myauth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', "avatar")

class PostCommentsSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Comments
        fields = ('id', 'body', 'author')
class CommentSerializers(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True,
    )
    class Meta:
        model = Comments
        fields = ('id', 'body', "post")
        read_only_fields = ("post",)

class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    author = UserSerializer(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    is_author = serializers.SerializerMethodField(read_only=True)
    comments = PostCommentsSerializer(read_only=True, many=True)
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
class ListPostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', "thumbnail")

    def get_thumbnail(self, obj):
        return "http://127.0.0.1:8000" + obj.thumbnail.url