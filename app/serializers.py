from rest_framework import serializers
from .models import (Artists, Employees, Customers, Invoices, MediaTypes, Genres, Tracks,
                     Playlists, PlaylistTrack, Albums, InvoiceItems)


class ArtistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ('name',)


class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        exclude = ('employeeid',)


class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        exclude = ('customerid',)


class InvoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoices
        exclude = ('invoiceid',)


class MediaTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaTypes
        exclude = ('mediatypeid',)


class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        exclude = ('genreid',)


class TracksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracks
        exclude = ('trackid',)


class PlaylistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        exclude = ('playlistid',)


class PlaylistTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistTrack
        fields = ('playlistid', 'trackid')


class AlbumsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albums
        exclude = ('albumid',)


class InvoiceItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItems
        exclude = ('invoiceitemid',)