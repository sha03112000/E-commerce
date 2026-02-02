from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

# Import serializers
from .token import CustomTokenSerializer
from .serializers import UserSerializer, RegisterSerializer



# User registration view
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serialzer = RegisterSerializer(data=request.data)
        serialzer.is_valid(raise_exception=True)
        serialzer.save()
        
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

# Login view using the custom token serializer
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer
    
    
    
# returns the currently logged-in user’s information based on the JWT token.
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)