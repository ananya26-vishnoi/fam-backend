# Generated by Django 4.2.6 on 2023-12-04 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_user_image_posts'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
