from django.db import models

# Create your models here.

class Tags(models.Model):
    name = models.CharField(max_length=125)
    def get_number_of_posts(self):
        return self.posts.count()
    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=125)
    body = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("myauth.User", on_delete=models.CASCADE, null=True, blank=True)
    liked = models.ManyToManyField("myauth.User", related_name="liked", blank=True)
    def get_likes(self):
        return self.liked.count()
    def __str__(self):
        return self.title


class Comments(models.Model):
    #manual
    body = models.TextField()

    #automatic
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("myauth.User", on_delete=models.CASCADE)
    post = models.ForeignKey("home.Post", on_delete=models.CASCADE, related_name="comments")
    liked = models.ManyToManyField("myauth.User", related_name="comment_liked", blank=True)

    def get_likes(self):
        return self.liked.count()
    def __str__(self):
        return f"{self.author.name} {self.body[:40]}"

