# Generated by Django 4.2.4 on 2023-11-03 08:58

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0013_post_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='thumbnail',
            field=imagekit.models.fields.ProcessedImageField(blank=True, upload_to='thumbnail'),
        ),
    ]
