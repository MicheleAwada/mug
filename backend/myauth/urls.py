from django.urls import path, include
from . import views


urlpatterns = [
    path('  auth/', include('rest_framework.urls'))
]