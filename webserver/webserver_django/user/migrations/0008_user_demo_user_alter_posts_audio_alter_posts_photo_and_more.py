# Generated by Django 5.0.1 on 2024-02-07 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0007_alter_posts_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='demo_user',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='posts',
            name='audio',
            field=models.FileField(blank=True, null=True, upload_to='static/audios/'),
        ),
        migrations.AlterField(
            model_name='posts',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='static/photos/'),
        ),
        migrations.AlterField(
            model_name='posts',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to='static/videos/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='static/profile_images/'),
        ),
    ]
