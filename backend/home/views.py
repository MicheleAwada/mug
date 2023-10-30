from django.shortcuts import render, redirect, reverse
from .models import Post, Comments
from myauth.models import User
from django.http import HttpResponseBadRequest, JsonResponse
from django.contrib import messages
from django.views.generic import DetailView, ListView
import json
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .forms import comment_form, create_blog

from rest_framework import viewsets
from . import serializers

# class PostsView(ListView):
#     model = Post
#     template_name = 'home/post-view.html'  # Replace with your template name
#
#     def get_queryset(self):
#         return Post.objects.all()[:50]


class PostsView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ListPostSerializer
        return serializers.PostSerializer # I dont' know what you want for create/destroy/update.


# class PostDetailView(DetailView):
#     model = Post
#     template_name = 'home/post-detail.html'  # Replace with your template name
#     def post(self, request, *args, **kwargs):
#         if not request.user.is_authenticated:
#             messages.warning(request, 'Please login first to comment')
#             return redirect('login')
#         form = comment_form(request.POST, request.FILES)
#         if form.is_valid():
#             self.object = self.get_object()
#             comment = form.save(commit=False)
#             comment.post = self.object
#             comment.author = request.user
#             comment.save()
#             messages.success(request, 'Your comment has been posted')
#         context = super(PostDetailView, self).get_context_data(**kwargs)
#         context['form'] = form
#         return self.render_to_response(context=context)
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['form'] = comment_form()
#         return context
#
# class AuthorPostsListView(ListView):
#     model = Post
#     template_name = 'home/author-view.html'  # Replace with your template name
#
#     def get_queryset(self):
#         user_id = self.kwargs.get('uid')  # Assuming 'user_id' is passed in the URL
#         self.user = get_object_or_404(User, id=user_id)
#         return Post.objects.filter(author=self.user)
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context["user"] = self.user
#         return context
#
#
# def AjaxLike(request):
#     if request.headers.get('x-requested-with') == 'XMLHttpRequest':
#         if request.method == 'POST':
#             if request.user.is_authenticated:
#                 data = json.load(request)
#                 object_id = data.get('object_id')
#                 object_type = data.get("object_type")
#                 if object_type == "post":
#                     object = get_object_or_404(Post, pk=object_id)
#                     already_liked = request.user.liked.filter(id=object_id).exists()
#                 elif object_type == "comment":
#                     object = get_object_or_404(Comments, pk=object_id)
#                     already_liked = request.user.comment_liked.filter(id=object_id).exists()
#                 if already_liked:
#                     object.liked.remove(request.user)
#                     object.save()
#                     return JsonResponse({'status': 'UnLiked'}, status=200)
#                 else:
#                     object.liked.add(request.user)
#                     object.save()
#                     return JsonResponse({'status': 'Liked'}, status=200)
#             return JsonResponse({'status': 'not authenticated'}, status=401)
#         return JsonResponse({'status': 'Invalid request'}, status=400)
#     else:
#         return HttpResponseBadRequest('Invalid request')
#
#
# def blog_create(request):
#     if request.method == "POST":
#         if not request.user.is_authenticated:
#             messages.warning(request, 'Please login first to create a blog')
#             return redirect(reverse('login'))
#         form = create_blog(request.POST)
#         if form.is_valid():
#             blog = form.save(commit=False)
#             blog.author = request.user
#             blog.save()
#             messages.success(request, 'Your blog post has been created')
#             return redirect('/')
#     else:
#         form = create_blog()
#     context = {'form': form}
#     return render(request, 'home/post-create.html', context)