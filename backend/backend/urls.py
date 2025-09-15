from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from users.views import RegisterUserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/token/', TokenObtainPairView.as_view(), name = "auth-token"),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name = "auth-token-refresh"),
    path("auth/register/", RegisterUserView.as_view(), name = "register-user"),
    path('users/', include("users.urls")),
    path('events/', include("events.urls")),
]
