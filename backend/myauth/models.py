from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("Users must have an username")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)

        user.set_password(password)

        user.save()

        return user



    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields["is_staff"] = True
        extra_fields["is_superuser"] = True

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=125)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email","name"]

    def __str__(self):
        return self.username
