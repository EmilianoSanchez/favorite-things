from auditlog.registry import auditlog
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
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self._state.adding is True or FavoriteThing.objects.get(pk=self.pk).ranking != self.ranking:
            FavoriteThing.updateOtherRankings(ranking=self.ranking, category=self.category)
        super().save(*args, **kwargs)

    @staticmethod
    def updateOtherRankings(ranking, category):
        entry_set = FavoriteThing.objects.filter(ranking=ranking, category=category)
        if len(entry_set) >= 1:
            FavoriteThing.updateOtherRankings(ranking + 1, category)
            entry_set[0].ranking += 1
            entry_set[0].save()


class Enum(models.Model):
    name = models.CharField(max_length=100, unique=True)
    values = models.TextField()


class Metadata(models.Model):
    TEXT = 'Text'
    DATE = 'Date'
    NUMBER = 'Number'
    ENUM = 'Enum'
    TYPES = [
        (TEXT, TEXT),
        (DATE, DATE),
        (NUMBER, NUMBER),
        (ENUM, ENUM),
    ]

    favorite_thing = models.ForeignKey(FavoriteThing, on_delete=models.CASCADE)
    key = models.CharField(max_length=100)
    type = models.CharField(max_length=6,
                            choices=TYPES,
                            default=TEXT,
                            error_messages={'invalid_choice': f'Valid choices are {TEXT}, {DATE}, {NUMBER} and {ENUM}'})
    enum = models.ForeignKey(Enum, on_delete=models.CASCADE, null=True)
    value = models.TextField()

    class Meta:
        unique_together = ('favorite_thing', 'key')


auditlog.register(Category)
auditlog.register(FavoriteThing, exclude_fields=['created_date', 'modified_date'])
auditlog.register(Enum)
auditlog.register(Metadata)
