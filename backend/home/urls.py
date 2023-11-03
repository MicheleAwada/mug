from django.urls import path, include
from . import views
from rest_framework import routers
from home import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'posts', views.PostsView, 'post')

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/like", views.AjaxLike, name="ajaxlike"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)