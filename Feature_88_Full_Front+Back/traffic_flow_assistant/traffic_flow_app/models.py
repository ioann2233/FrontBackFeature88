from django.db import models

class Location(models.Model):
    title = models.CharField(max_length=10000, unique=True)


class Incidents(models.Model):
    title = models.CharField(max_length=200)
    type_inc = models.CharField(max_length=200)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='incidents')
    text = models.TextField(blank=True, null=True)
    status = models.BooleanField(default=True)

    creature = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ResponseIncident(models.Model):
    incident = models.ForeignKey(Incidents, on_delete=models.CASCADE, related_name='responses')
    text = models.TextField()
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)

class Cameras(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='cameras')
    ip_address = models.CharField(max_length=45)