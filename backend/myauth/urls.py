from django.urls import path, include
from rest_framework.authtoken import views as drf_views
from . import views


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('token-auth/', drf_views.obtain_auth_token),
    path('signup/', views.RegisterView.as_view())
]