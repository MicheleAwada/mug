from django.urls import path, include
from . import views

urlpatterns = [
    # path("signup/", views.signup, name="signup"),
    path("", include("django.contrib.auth.urls")),
    # path('login/', views.login_view, name='api-login'),
    # path('logout/', views.logout_view, name='api-logout'),
    # path('session/', views.session_view, name='api-session'),
    # path('whoami/', views.whoami_view, name='api-whoami'),
]