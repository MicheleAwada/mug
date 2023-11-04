from django.db import models

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFit
# Create your models here.

class Tags(models.Model):
    name = models.CharField(max_length=125)
    def get_number_of_posts(self):
        return self.posts.count()
    def __str__(self):
        return self.name

class Post(models.Model):
    blog_post_types = [
        ("tu", "Tutorial"),
        ("hg", "How-To Guides"),
        ("nw", "News and Updates"),
        ("pr", "Product Reviews"),
        ("op", "Opinion Pieces"),
        ("tp", "Top x"),
        ("ps", "Personal Stories and Experiences"),
        ("cs", "Case Studies"),
        ("in", "Interviews"),
        ("ig", "Infographics"),
        ("gp", "Guest Posts"),
        ("rp", "Roundup Posts"),
        ("rc", "Reviews and Comparisons"),
        ("rt", "Resources and Tools"),
        ("td", "Travel Destinations"),
        ("re", "Recipes"),
        ("fa", "Fashion"),
        ("ft", "Fitness Tips"),
        ("nu", "Nutrition"),
        ("mh", "Mental Health"),
        ("dp", "DIY Projects"),
        ("im", "Inspirational or Motivational"),
        ("he", "History and Education"),
        ("qa", "Q&A"),
        ("aq", "FAQ")
    ]
    title = models.CharField(max_length=125)
    body = models.TextField()
    type = models.CharField(max_length=2, choices=blog_post_types)

    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("myauth.User", on_delete=models.CASCADE)
    liked = models.ManyToManyField("myauth.User", related_name="liked", blank=True)

    image = models.ImageField(upload_to="thumbnails")
    thumbnail = ImageSpecField(source='image', processors=[ResizeToFit(576, 324)], format='JPEG',
                             options={'quality': 60})
    def get_likes(self):
        return self.liked.count()
    def is_liked_by(self, user):
        return user in self.liked.all()
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']


class Comments(models.Model):
    #manual
    body = models.TextField()

    #automatic
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey("myauth.User", on_delete=models.CASCADE)
    post = models.ForeignKey("home.Post", on_delete=models.CASCADE, related_name="comments")
    liked = models.ManyToManyField("myauth.User", related_name="comment_liked", blank=True)

    def get_likes(self):
        return self.liked.count()
    def __str__(self):
        return f"{self.author.name} {self.body[:40]}"

