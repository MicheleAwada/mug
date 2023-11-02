from .models import Post
from rest_framework import serializers
from myauth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'email')

class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'created_at')
class ListPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title')