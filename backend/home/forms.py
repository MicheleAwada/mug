from django import forms
from .models import Comments, Post


class comment_form(forms.ModelForm):
    class Meta:
        model = Comments
        fields = ['body']

class create_blog(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'body']