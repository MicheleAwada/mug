from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated

User = get_user_model()


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django.conf import settings


from .  serializers import random_username_from_name
import jwt

from jwt.exceptions import InvalidSignatureError, ImmatureSignatureError, ExpiredSignatureError
google_secret = settings.GOOGLE_CLIENT_SECRET

class login(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        userdata = serializers.MyUserSerializer(user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': userdata.data
        })

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
            userdata = serializers.MyUserSerializer(user)
            token = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": userdata.data })
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

class GoogleAuth(APIView):
    def post(self, request):
        data = request.data
        encoded_jwt = data.get('credential')
        try:
            user_info = jwt.decode(encoded_jwt, google_secret, algorithms=["HS256"])
        except InvalidSignatureError:
            return Response({'status': 'Invalid signature, please try again'}, status=400)
        except ImmatureSignatureError:
            return Response({'status': 'Immature signature, please try again'}, status=400)
        except ExpiredSignatureError:
            return Response({'status': 'Expired signature, please try again'}, status=400)
        else:
            email = user_info.get('email')
            name = user_info.get("name")
            username = random_username_from_name(name)
            user = User.objects.create_user(username=username, email=email, name=name, password="")
            userdata = serializers.MyUserSerializer(user)
            token = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": userdata.data })




