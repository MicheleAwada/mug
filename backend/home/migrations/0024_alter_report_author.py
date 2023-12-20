# Generated by Django 4.2.7 on 2023-12-01 12:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0023_alter_report_author_alter_report_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='author',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='reports', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]