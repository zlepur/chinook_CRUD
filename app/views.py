# from django.shortcuts import render
from rest_framework import viewsets
from . import models
from . import serializers


class ArtistsViewSet(viewsets.ModelViewSet):
    queryset = models.Artists.objects.all()
    serializer_class = serializers.ArtistsSerializer


class EmployeesViewSet(viewsets.ModelViewSet):
    queryset = models.Employees.objects.all()
    serializer_class = serializers.EmployeesSerializer


class CustomersViewSet(viewsets.ModelViewSet):
    queryset = models.Customers.objects.all()
    serializer_class = serializers.CustomersSerializer


class InvoicesViewSet(viewsets.ModelViewSet):
    queryset = models.Invoices.objects.all()
    serializer_class = serializers.InvoicesSerializer


class MediaTypesViewSet(viewsets.ModelViewSet):
    queryset = models.MediaTypes.objects.all()
    serializer_class = serializers.MediaTypesSerializer


class GenresViewSet(viewsets.ModelViewSet):
    queryset = models.Genres.objects.all()
    serializer_class = serializers.GenresSerializer


class TracksViewSet(viewsets.ModelViewSet):
    queryset = models.Tracks.objects.all()
    serializer_class = serializers.TracksSerializer


class PlaylistsViewSet(viewsets.ModelViewSet):
    queryset = models.Playlists.objects.all()
    serializer_class = serializers.PlaylistsSerializer


class PlaylistTrackViewSet(viewsets.ModelViewSet):
    queryset = models.PlaylistTrack.objects.all()
    serializer_class = serializers.PlaylistTrackSerializer


class AlbumsViewSet(viewsets.ModelViewSet):
    queryset = models.Albums.objects.all()
    serializer_class = serializers.AlbumsSerializer


class InvoiceItemsViewSet(viewsets.ModelViewSet):
    queryset = models.InvoiceItems.objects.all()
    serializer_class = serializers.InvoiceItemsSerializer
