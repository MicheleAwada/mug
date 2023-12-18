from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated

from django.core.exceptions import ValidationError

User = get_user_model()

import random

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django.conf import settings

from django.contrib.auth.models import Group

from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

import requests
from django.core.files.base import ContentFile
from django.core.files import File



google_client_id = settings.GOOGLE_CLIENT_ID
google_secret = settings.GOOGLE_CLIENT_SECRET

def return_user_data(user):
    userdata = serializers.MyUserSerializer(user)
    token, created = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user': userdata.data
    })

class login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return return_user_data(user)


#todo add delete option
class UserView(
        mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        # mixins.UpdateModelMixin,
        # mixins.DestroyModelMixin,
        mixins.ListModelMixin,
        GenericViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def create(self, request):
        serializer = serializers.UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # TODO add token to signal
            return return_user_data(user)
        return Response(serializer.errors, status=400)

    def list(self, request):
        serializer = serializers.MyUserSerializer(request.user)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == "list":
            return [IsAuthenticated()]
        return []

class FollowView(APIView):
    def post(self, request):
        if request.method == 'POST':
            if request.user.is_authenticated:
                data = request.data
                author_id = data.get('user_id')
                author = get_object_or_404(User, pk=author_id)
                user = request.user
                if author==user:
                    return Response({"status": "you can't follow yourself"},status=400)

                user.follow_or_unfollow(author)

                return Response(status=200)
            return Response({'status': 'not authenticated'}, status=401)
        return Response({'status': 'Invalid request'}, status=400)


def random_username_from_name(name):
    name = name.replace(" ", "")
    username = ""
    i = 0
    incrementor = 1
    while True:
        i += 1
        if i > 100:
            i = 0
            incrementor += 1
        username = name + str(random.randint(10 ** incrementor, 10 ** (incrementor + 1) - 1))
        if not User.objects.filter(username=username).exists():
            break
    return username

def add_image_from_url(obj, image_field_name, image_url):
    response = requests.get(image_url)

    if response.status_code != 200:
        raise ValidationError("Invalid image URL")

    image_content = response.content

    # Save the image to the image field
    image_field = getattr(obj, image_field_name)
    image_field.save(
        'google user image.png',  # Change 'image_name.jpg' to the desired filename
        ContentFile(image_content),
        save=True
    )


class GoogleAuth(APIView):
    def post(self, request):
        data = request.data
        token = data.get('credential')
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), google_client_id)

            if not (idinfo["aud"] == google_client_id == data.get("clientId")):
                raise ValidationError("Invalid client ID.")
        except:
            # Invalid token
            return Response({"status": "invalid token"}, status=400)
        else:
            userid = str(idinfo['sub'])
            email = idinfo.get('email')
            name = idinfo.get("name")
            google_users_group, created = Group.objects.get_or_create(name="google_users")


            user = google_users_group.user_set.filter(google_id=userid)
            user_exists = user.exists()
            if user_exists:# login account
                user = user.first()
            else: # create account
                username = random_username_from_name(name)
                user = User.objects.create_user(username=username, email=email, name=name, password="",
                                                groups=[google_users_group], hash=False, google_id=userid)
                picture_url = idinfo.get("picture", None)
                if picture_url is not None:
                    add_image_from_url(user, "avatar", picture_url)
            return return_user_data(user)