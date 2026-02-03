from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and request.user.role == "admin"
        )
        
        
class IsVendor(BasePermission):
    """
    Allows access only to vendor users.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and request.user.role == "vendor"
        )
        
class IsCustomer(BasePermission):
    """
    Allows access only to customer users.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and request.user.role == "customer"
        )