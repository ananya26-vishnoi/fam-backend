import string
import random
from django.db.models import F
from datetime import datetime
from .serializers import PostSerializer
from .models import Posts
from rest_framework.parsers import FileUploadParser
from rest_framework import generics
from django.core.mail import send_mail
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .serializers import *
from rest_framework import viewsets
import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os
from dotenv import load_dotenv
load_dotenv()


class UserViews:

    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))

    @api_view(['POST'])
    def register(request):
        required_fields = ["first_name", "last_name",
                           "email", "password", "repeat_password"]

        # Check if all required fields are present in the request data
        if not all(field in request.data for field in required_fields):
            return Response({"error": "first name, last name, email, password, and repeat password are required"}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        repeat_password = data.get('repeat_password')

        if password != repeat_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if a user with the same email already exists
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
        # Create a new user
        user = User(email=email, password=password, first_name=first_name, last_name=last_name)
        token_value = ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
        user.token_value = token_value
        user.save()

        otp = UserViews.generate_otp()
        user.otp = otp
        user.save()


        # Send the OTP to the user's email
        send_mail(
            'OTP Verification',
            f'Your OTP for registration is: {otp}',
            os.getenv('EMAIL_HOST_USER'),  # Replace with your sender email
            [email],  # Use the user's provided email
            fail_silently=False,
        )
        # Serialize the user data
        user_serializer = UserSerializer(user)

        # Return a success response
        return Response({"user": user_serializer.data, "message": "User created. Check your email for OTP verification."}, status=status.HTTP_201_CREATED)

    def email_is_verified(self):
        return self.is_email_verified

    @api_view(['POST'])
    def login(request):
        if "token_value" in request.data:
            token_value = request.data["token_value"]
            if User.objects.filter(token_value=token_value).exists():
                user = User.objects.get(token_value=token_value)
                user_serializer = UserSerializer(user)
                if user.is_email_verified:
                    return Response({"user": user_serializer.data, "message": "Logged in successfully."}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Email is not verified. Please verify your email with the OTP sent to your inbox."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "token does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        if "email" not in request.data or "password" not in request.data:
            return Response({"error": "email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data["email"]
        password = request.data["password"]

       # check password
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if user.password != password:
                return Response({"error": "password is wrong"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "email does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        # check user.is_email_verified
        if not user.is_email_verified:
            return Response({"error": "email is not verified"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(email=email)
        token_value = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=15))
        user.token_value = token_value
        user.save()
        user_serializer = UserSerializer(user)
        return Response({"user": user_serializer.data}, status=status.HTTP_200_OK)

    @api_view(['POST'])
    def verify_otp(request):
        if "email" not in request.data or "otp" not in request.data:
            return Response({"error": "email and otp are required"}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data["email"]
        otp = request.data["otp"]
        if not User.objects.filter(email=email).exists():
            return Response({"error": "email does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(email=email)
        if otp != user.otp:
            return Response({"error": "otp is wrong"}, status=status.HTTP_400_BAD_REQUEST)
        user.is_email_verified = True
        user.save()
        user_serializer = UserSerializer(user)
        return Response({"user": user_serializer.data}, status=status.HTTP_200_OK)


class PostViews:

    @api_view(['POST'])
    def create_post(request):
        # for demo user
        if 'demo_user' in request.data and request.data['demo_user'] == 'true':
            user = User.objects.filter(demo_user=True).first()
            post = Posts(user=user)
            username = f"{user.first_name} {user.last_name}"
            post.username = username
            if "text" in request.data:
                text = request.data['text']
                post.text = text
            if "audio" in request.data:
                audio = request.data['audio']
                post.audio = audio
            if "photo" in request.data:
                photo = request.data['photo']
                post.photo = photo
            if "video" in request.data:
                video = request.data['video']
                post.video = video
            post.save()
            post_serializer = PostSerializer(post)
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        else:
            # checking if we have received important data from the frontend
            if "user" not in request.data:
                return Response({"error": "user id is required"}, status=status.HTTP_400_BAD_REQUEST)
            # getting data from frontend
            userid = request.data['user']
            # checking data is present in backend
            if not User.objects.filter(id=userid).exists():
                return Response({"error": "user id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            # getting data from backend
            user = User.objects.get(id=userid)
            post = Posts(user=user)
            # creating data on backend
            username = f"{user.first_name} {user.last_name}"
            post.username = username

            # checking for optional data
            if "text" in request.data:
                text = request.data['text']
                post.text = text
            if "audio" in request.data:
                audio = request.data['audio']
                post.audio = audio
            if "photo" in request.data:
                photo = request.data['photo']
                post.photo = photo
            if "video" in request.data:
                video = request.data['video']
                post.video = video

            # returning response
            post.save()

            post_serializer = PostSerializer(post)
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)

    @api_view(['GET'])
    def get_post(request):
        # checking if we have received important data from the frontend
        if 'user' not in request.query_params and 'post' not in request.query_params:
            return Response({"error": "user or post id are missing"}, status=status.HTTP_400_BAD_REQUEST)
        # getting data from frontend
        userid = int(request.query_params['user'])
        postid = int(request.query_params['post'])
        # checking data is present in backend
        if not User.objects.filter(id=userid).exists():
            return Response({"error": "user id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        if not Posts.objects.filter(id=postid).exists():
            return Response({"error": "post id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        # getting data from backend
        user = User.objects.get(id=userid)
        post = Posts.objects.get(id=postid)
        # returning response
        post_serializer = PostSerializer(post)
        return Response(post_serializer.data, status=status.HTTP_200_OK)

    @api_view(['GET'])
    def get_all_posts(request):

        # check if user is a demo user or not
        if 'demo_user' in request.query_params and request.query_params['demo_user'] == 'true':
           
            user = User.objects.filter(demo_user=True).first()
            posts = Posts.objects.filter(user=user).order_by(F('created_at').desc())
            for post in posts:
                post.created_at = post.created_at.strftime('%d.%m.%Y')
            post_serializer = PostSerializer(posts, many=True)
            for x in post_serializer.data:
                if x['photo']:
                    x['photo'] = os.getenv('BASE_URL') + x['photo']
            return Response(post_serializer.data, status=status.HTTP_200_OK)
        
        
        # For main user
        else:
            # Retrieve all posts from the database
            if 'user' not in request.query_params:
                return Response({"error": "user id is missing"}, status=status.HTTP_400_BAD_REQUEST)
            # getting data from frontend
            token_value = request.query_params['user']

            # checking data is present in backend
            if not User.objects.filter(token_value=token_value).exists():
                return Response({"error": "user id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            # getting data from backend
            user = User.objects.get(token_value=token_value)

        # Filter posts based on user and user_identifier
            posts = Posts.objects.filter(
                user=user).order_by(F('created_at').desc())
            for post in posts:
                post.created_at = post.created_at.strftime('%d.%m.%Y')
            post_serializer = PostSerializer(posts, many=True)
            for x in post_serializer.data:
                if x['photo']:
                    x['photo'] = os.getenv('BASE_URL') + x['photo']
            return Response(post_serializer.data, status=status.HTTP_200_OK)

    @api_view(['PUT'])
    def update_post(request):
        # checking if we have received important data from the frontend
        if 'user' not in request.data and 'post' not in request.data:
            return Response({"error": "user or post id are missing"}, status=status.HTTP_400_BAD_REQUEST)
        # getting data from frontend
        userid = int(request.data['user'])
        postid = int(request.data['post'])
        # checking data is present in backend
        if not User.objects.filter(id=userid).exists():
            return Response({"error": "user id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        if not Posts.objects.filter(id=postid).exists():
            return Response({"error": "post id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        # getting data from backend
        user = User.objects.get(id=userid)
        post = Posts.objects.get(id=postid)
        # updating data to backend
        if "text" in request.data:
            text = request.data["text"]
            post.text = text
        if "photo" in request.data:
            photo = request.data["photo"]
            post.photo = photo
        if "audio" in request.data:
            audio = request.data["audio"]
            post.audio = audio
        if "video" in request.data:
            video = request.data["video"]
            post.video = video

        # returning response
        post.save()
        post_serializer = PostSerializer(post)
        return Response(post_serializer.data, status=status.HTTP_200_OK)

    @api_view(['DELETE'])
    def delete_post(request):
        # checking if we have received important data from the frontend
        if 'user' not in request.data and 'post' not in request.data:
            return Response({"error": "user or post id are missing"}, status=status.HTTP_400_BAD_REQUEST)
        # getting data from frontend
        userid = int(request.data['user'])
        postid = int(request.data['post'])
        # checking data is present in backend
        if not User.objects.filter(id=userid).exists():
            return Response({"error": "user id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        if not Posts.objects.filter(id=postid).exists():
            return Response({"error": "post id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        # deleting data from backend
        post = Posts.objects.get(id=postid)
        post.delete()
        return Response("Post deleted successfully", status=status.HTTP_200_OK)
