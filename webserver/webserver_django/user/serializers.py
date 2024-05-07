from rest_framework import serializers 
from .models import User, Posts


class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = User 
        fields = ('first_name', 'last_name', 'email','is_email_verified' ,'token_value')
        

class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Posts
        fields = ['id', 'user', 'username' ,'text', 'audio', 'photo', 'video', 'created_at']
