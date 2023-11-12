from rest_framework import serializers

from django.contrib.auth import get_user_model


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"
    def create(self, data):
        user_obj = UserModel.objects.create_user(name=data['name'], username=data['username'], email=data['email'], password=data['password'])
        return user_obj

class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "avatar", "posts")

    # PROD change domain
    def get_avatar(self, obj):
        return "http://127.0.0.1:8000" + obj.avatar.url
class MyUserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "email", "avatar")

    # PROD change domain
    def get_avatar(self, obj):
        return "http://127.0.0.1:8000" + obj.avatar.url