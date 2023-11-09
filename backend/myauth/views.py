from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from . import validators, serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        cleaned_data = validators.user_register_validation(request.data)
        serializer = serializers.UserRegisterSerializer(data=cleaned_data)
        if serializer.is_valid():
            user = serializer.save()
            # TODO add token to signal
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "user": serializer.data })
        return Response(serializer.errors, status=400)
# class UserView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = serializers.UserSerializer
#
#     def list(self, request):
#         serializer = serializers.MyUserSerializer(request.user)
#         return Response(serializer.data)
#     def get_serializer_class(self):
#         if self.request.method == 'GET':
#             return serializers.MyUserSerializer
#         return serializers.UserSerializer

#todo add delete option
class UserView(
        # mixins.CreateModelMixin,
        mixins.RetrieveModelMixin,
        # mixins.UpdateModelMixin,
        # mixins.DestroyModelMixin,
        mixins.ListModelMixin,
        GenericViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

    def list(self, request):
        serializer = serializers.MyUserSerializer(request.user)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == "list":
            return [IsAuthenticated()]
        return []
