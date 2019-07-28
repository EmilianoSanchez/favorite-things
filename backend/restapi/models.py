from django.core.validators import MinLengthValidator, MinValueValidator
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class FavoriteThing(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, validators=[MinLengthValidator(10)])
    ranking = models.IntegerField(validators=[MinValueValidator(1)], default=1)
    # metadata = models.TextField(blank=True, validators=[MinLengthValidator(10)])
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    # audit_log =

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        FavoriteThing.updateOtherRankings(ranking=self.ranking,category=self.category)
        super().save(*args, **kwargs)

    @staticmethod
    def updateOtherRankings(ranking ,category ):
        entry_set = FavoriteThing.objects.filter(ranking=ranking, category=category)
        if len(entry_set) >= 1:
            FavoriteThing.updateOtherRankings(ranking + 1, category)
            entry_set[0].ranking += 1
            entry_set[0].save()
