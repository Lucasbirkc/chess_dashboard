from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    User model
    """

    is_premium = models.BooleanField(default=False)
    premium_expires_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.email