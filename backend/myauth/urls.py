from django.urls import path, include
from rest_framework.authtoken import views as drf_views
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"user", views.UserView, basename="user")

urlpatterns = [
    # path('auth/', include('rest_framework.urls')),
    path('', include(router.urls)),
    path("login/", views.login.as_view(), name='login')
]