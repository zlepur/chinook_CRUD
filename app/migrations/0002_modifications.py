from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customers',
            name='supportrepid',
            field=models.ForeignKey(blank=True, db_column='SupportRepId', null=True,
                                    on_delete=django.db.models.deletion.SET_NULL, to='app.Employees'),
        ),
        migrations.AddField(
            model_name='albums',
            name='artistid',
            field=models.ForeignKey(db_column='ArtistId',
                                    on_delete=django.db.models.deletion.CASCADE, to='app.Artists'),
        ),
        migrations.CreateModel(
            name='PlaylistTrack',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('playlistid', models.ForeignKey(db_column='PlaylistId',
                                                 on_delete=django.db.models.deletion.CASCADE, to='app.Playlists')),
                ('trackid', models.ForeignKey(db_column='TrackId',
                                              on_delete=django.db.models.deletion.CASCADE, to='app.Tracks')),
            ],
            options={
                'db_table': 'playlist_track',
                'unique_together': {('playlistid', 'trackid')},
            },
        ),
    ]
