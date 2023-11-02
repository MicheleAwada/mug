from django.urls import path, include
from rest_framework.authtoken import views


urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('token-auth/', views.obtain_auth_token),
]