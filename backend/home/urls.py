from django.urls import path, include
from . import views
from rest_framework import routers
from home import views

router = routers.DefaultRouter()
router.register(r'posts', views.PostsView, 'post')

urlpatterns = [
    # path("", views.PostsView.as_view(), name="post-view"),
    # path("post/<int:pk>/", views.PostDetailView.as_view(), name="post-detail"),
    # path("author/<int:uid>/", views.AuthorPostsListView.as_view(), name="author-view"),
    # path("like", views.AjaxLike, name="ajaxlike"),
    # path("create", views.blog_create, name="post-create"),
    path("api/", include(router.urls))
]