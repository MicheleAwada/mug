from django.urls import path, include
from . import views
from rest_framework import routers
from . import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'posts', views.PostsView, 'posts')
router.register(r'comments', views.CommentsView, 'comments')

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/like", views.Like, name="like"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)