from django.shortcuts import render, redirect, reverse
from .models import Post, Comments
from myauth.models import User
from django.http import HttpResponseBadRequest, JsonResponse
import json
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .forms import comment_form, create_blog
from .permissions import IsAuthorOrReadOnly, IsAuthenticated

from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers



class PostsView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer

    def list(self, request):
        serializer = serializers.ListPostSerializer(data=self.queryset, many=True)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    def create(self, request):
        serializer = serializers.PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
        return Response(serializer.data)
    # def get_serializer_class(self):
    #     if self.action == 'list':
    #         return serializers.ListPostSerializer
    #     return serializers.PostSerializer
    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        elif self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsAuthorOrReadOnly()]
def AjaxLike(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        if request.method == 'POST':
            if request.user.is_authenticated:
                data = json.load(request)
                object_id = data.get('object_id')
                object_type = data.get("object_type")
                if object_type == "post":
                    object = get_object_or_404(Post, pk=object_id)
                    already_liked = request.user.liked.filter(id=object_id).exists()
                elif object_type == "comment":
                    object = get_object_or_404(Comments, pk=object_id)
                    already_liked = request.user.comment_liked.filter(id=object_id).exists()
                if already_liked:
                    object.liked.remove(request.user)
                    object.save()
                    return JsonResponse({'status': 'Unliked'}, status=200)
                else:
                    object.liked.add(request.user)
                    object.save()
                    return JsonResponse({'status': 'Liked'}, status=200)
            return JsonResponse({'status': 'not authenticated'}, status=401)
        return JsonResponse({'status': 'Invalid request'}, status=400)
    else:
        return HttpResponseBadRequest('Invalid request')