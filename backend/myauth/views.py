from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from . import validators, serializers
from rest_framework.authtoken.models import Token

class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        cleaned_data = validators.user_register_validation(request.data)
        serializer = serializers.UserRegisterSerializer(data=cleaned_data)
        if serializer.is_valid():
            user = serializer.save()
            # TODO add token to signal
            token = Token.objects.create(user=user)
            return Response({"token": token.key})
        return Response(serializer.errors, status=400)
