from django import forms
from .models import Comment, Post


class comment_form(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['body']

class create_blog(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'body']