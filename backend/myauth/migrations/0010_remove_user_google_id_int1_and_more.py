# Generated by Django 4.2.7 on 2023-12-17 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0009_rename_google_id_user_google_id_int1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='google_id_int1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='google_id_int2',
        ),
        migrations.AddField(
            model_name='user',
            name='google_id',
            field=models.CharField(blank=True, max_length=130, null=True),
        ),
    ]