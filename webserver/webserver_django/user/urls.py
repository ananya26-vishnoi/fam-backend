from django.urls import path
from . import views


urlpatterns = [
    path('register', views.UserViews.register, name="register"),
    path('login', views.UserViews.login,name="login"),
    path('verify', views.UserViews.verify_otp, name="verify"),
    path('create_post', views.PostViews.create_post, name='create_post'),
    path('get_post',views.PostViews.get_post,name='get_post'),
    path('update_post',views.PostViews.update_post, name='update_post'),
    path('delete_post',views.PostViews.delete_post, name='delete_post'),
    path('all_posts',views.PostViews.get_all_posts,name="all_posts")

]
