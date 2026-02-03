from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenSerializer(TokenObtainPairSerializer):
    # Tell SimpleJWT to authenticate using `email` instead of `username`
    # This allows login with email + password
    username_field = "email"

    @classmethod
    def get_token(cls, user):
        """
        This method is called after the user is authenticated.
        It creates the JWT token and lets us add custom data (claims)
        to the token payload.
        """
        
        # Generate the default token (includes exp, jti, token_type, etc.)
        token = super().get_token(user)
        
        # Add custom claims so the frontend/backend can access
        token["user_id"] = user.id
        token["email"] = user.email
        token["role"] = user.role
        token["is_staff"] = user.is_staff
        
        return token
