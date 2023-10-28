from .models import Post
from rest_framework import serializers
from myauth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'email')

class PostSerializer(serializers.ModelSerializer):
    # liked = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())  # Assuming User is the related model
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'author')