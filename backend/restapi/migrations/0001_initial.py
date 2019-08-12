# Generated by Django 2.1.1 on 2019-08-12 22:28

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Enum',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('values', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FavoriteThing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, unique=True)),
                ('description', models.TextField(blank=True, validators=[django.core.validators.MinLengthValidator(10)])),
                ('ranking', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)])),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Metadata',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('Text', 'Text'), ('Date', 'Date'), ('Number', 'Number'), ('Enum', 'Enum')], default='Text', error_messages={'invalid_choice': 'Valid choices are Text, Date, Number and Enum'}, max_length=6)),
                ('value', models.TextField()),
                ('enum', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='restapi.Enum')),
                ('favorite_thing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.FavoriteThing')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='metadata',
            unique_together={('favorite_thing', 'key')},
        ),
    ]
