# Generated by Django 5.0.1 on 2024-01-16 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_posts_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='username',
            field=models.CharField(default=1, max_length=255),
            preserve_default=False,
        ),
    ]
