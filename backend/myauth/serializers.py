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
    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "avatar", "posts")
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'name', 'username', "email", "avatar")