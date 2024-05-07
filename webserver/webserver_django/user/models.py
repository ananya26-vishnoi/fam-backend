from django.db import models 

class User(models.Model):
    first_name = models.CharField(max_length=1000)
    last_name = models.CharField(max_length=1000)
    email = models.EmailField()
    password = models.CharField(max_length=1000)
    token_value = models.CharField(max_length=1000)
    otp = models.CharField(max_length=6, null=True, blank=True)
    is_email_verified = models.BooleanField(default=False)
    image = models.ImageField(upload_to='static/profile_images/', blank=True, null=True) 
    demo_user = models.BooleanField(default=False)

class Posts(models.Model):
    username=models.CharField(max_length=255)
    text = models.CharField(max_length=255, blank=True, null=True)
    photo = models.ImageField(upload_to='static/photos/', blank=True, null=True)
    audio = models.FileField(upload_to='static/audios/', blank=True, null=True)
    video = models.FileField(upload_to='static/videos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    updated_at=models.DateTimeField(auto_now_add=True,null=True, blank=True)

