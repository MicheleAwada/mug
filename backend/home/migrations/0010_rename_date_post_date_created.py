# Generated by Django 4.2.4 on 2023-10-30 12:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_alter_post_author'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='date',
            new_name='date_created',
        ),
    ]
