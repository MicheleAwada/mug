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



class CommentsView(viewsets.ModelViewSet):
    queryset = Comments.objects.all()

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsAuthorOrReadOnly()]
    def create(self, request):
        serializer = serializers.CreateCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def get_serializer_class(self):
        print(self.action)
        if self.request.method == 'GET':
            return serializers.GetDebugCommentSerializer
            # return HttpResponseBadRequest()
        # if self.action == 'create':
        #     print("POSTTTTTT")
        #     return serializers.CreateCommentSerializer
        return serializers.CommentSerializer


class PostsView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.EditPostSerializer

    def create(self, request):
        print(request)
        serializer = serializers.EditPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        elif self.request.method == 'POST':
            return [IsAuthenticated()]
        return [IsAuthorOrReadOnly()]
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ListPostSerializer
        # if self.action == "retrieve":
        return serializers.PostSerializer
        # return serializers.EditPostSerializer

def Like(request):
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