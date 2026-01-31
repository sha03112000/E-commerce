from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)

    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("vendor", "Vendor"),
        ("customer", "Customer"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer"
    )

    # Use email as the unique identifier for authentication instead of username
    # This means users will log in using their email address
    USERNAME_FIELD = "email"
    
    
    # Fields required when creating a superuser via createsuperuser command
    # Since USERNAME_FIELD is email, Django will also prompt for username
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
