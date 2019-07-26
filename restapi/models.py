from django.core.validators import MinLengthValidator, MinValueValidator
from django.db import models


# class Category(models.Model):
#     name = models.CharField(max_length=200)
#
#     def __str__(self):
#         return self.name


class FavoriteThing(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, validators=[MinLengthValidator(10)])
    ranking = models.IntegerField(validators=[MinValueValidator(1)], default = 1)
    # metadata
    category = models.CharField(max_length=200) # models.ForeignKey(Category, on_delete=models.CASCADE)
    # created_date = models.DateTimeField()
    # modified_date = models.DateTimeField()
    # audit_log =

    def __str__(self):
        return self.title
