from django.urls import path, include
from rest_framework.authtoken import views as drf_views
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"user", views.UserView, basename="user")

urlpatterns = [
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('', include(router.urls)),
    path("login/", views.login.as_view(), name='login'),
    path("follow/", views.FollowView.as_view(), name='follow'),
    path("login/google/", views.GoogleAuth.as_view(), name="google-auth")
]