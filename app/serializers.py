import urllib.parse
from rest_framework import serializers
from .models import (Artists, Employees, Customers, Invoices, MediaTypes, Genres, Tracks,
                     Playlists, PlaylistTrack, Albums, InvoiceItems)


class RelatedFieldsNameURLMixin():
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        for field, lookup_field in self.URL_CONFIG.items():
            obj = getattr(instance, field)
            data = getattr(obj, lookup_field, None)
            ret[field] = {'data': data, 'url': ret[field]}
        return ret


class HyperlinkedPathRelatedField(serializers.HyperlinkedRelatedField):
    def get_url(self, obj, view_name, request, format):
        url = super().get_url(obj, view_name, request, format)
        parse_result = urllib.parse.urlparse(url)
        return parse_result.path


class ArtistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ('name', 'pk')


class EmployeesSerializer(RelatedFieldsNameURLMixin, serializers.ModelSerializer):
    URL_CONFIG = {'reportsto': 'lastname'}
    reportsto = HyperlinkedPathRelatedField('employees-detail', read_only=True)

    class Meta:
        model = Employees
        fields = ('lastname', 'firstname', 'title', 'reportsto', 'birthdate', 'hiredate',
                  'address', 'city', 'state', 'country', 'postalcode', 'phone', 'fax', 'email',
                  'pk')


class CustomersSerializer(RelatedFieldsNameURLMixin, serializers.ModelSerializer):
    URL_CONFIG = {'supportrepid': 'lastname'}
    supportrepid = HyperlinkedPathRelatedField('employees-detail', read_only=True)

    class Meta:
        model = Customers
        fields = ('firstname', 'lastname', 'company', 'address',
                  'city', 'state', 'country', 'postalcode', 'phone', 'fax', 'email', 'supportrepid',
                  'pk')


class InvoicesSerializer(RelatedFieldsNameURLMixin, serializers.ModelSerializer):
    URL_CONFIG = {'customerid': 'lastname'}
    customerid = HyperlinkedPathRelatedField('customers-detail', read_only=True)

    class Meta:
        model = Invoices
        fields = ('customerid', 'invoicedate', 'billingaddress',
                  'billingcity', 'billingstate', 'billingcountry', 'billingpostalcode', 'total',
                  'pk')


class MediaTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaTypes
        fields = ('name', 'pk')


class GenresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genres
        fields = ('name', 'pk')


class TracksSerializer(RelatedFieldsNameURLMixin, serializers.ModelSerializer):
    URL_CONFIG = {'albumid': 'title', 'mediatypeid': 'name', 'genreid': 'name'}
    albumid = HyperlinkedPathRelatedField('albums-detail', read_only=True)
    mediatypeid = HyperlinkedPathRelatedField('mediatypes-detail', read_only=True)
    genreid = HyperlinkedPathRelatedField('genres-detail', read_only=True)

    class Meta:
        model = Tracks
        fields = ('name', 'albumid', 'mediatypeid', 'genreid',
                  'composer', 'milliseconds', 'bytes', 'unitprice', 'pk')


class PlaylistsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ('name', 'pk')


class PlaylistTrackSerializer(RelatedFieldsNameURLMixin, serializers.ModelSerializer):
    URL_CONFIG = {'playlistid': 'name', 'trackid': 'name'}
    playlistid = HyperlinkedPathRelatedField('playlists-detail', read_only=True)
    trackid = HyperlinkedPathRelatedField('tracks-detail', read_only=True)

    class Meta:
        model = PlaylistTrack
        fields = ('playlistid', 'trackid', 'pk')


class AlbumsSerializer(RelatedFieldsNameURLMixin, serializers.HyperlinkedModelSerializer):
    URL_CONFIG = {'artistid': 'name'}

    artistid = HyperlinkedPathRelatedField('artists-detail', read_only=True)

    class Meta:
        model = Albums
        fields = ('title', 'artistid', 'pk')


class InvoiceItemsSerializer(RelatedFieldsNameURLMixin, serializers.ModelSerializer):
    URL_CONFIG = {'invoiceid': 'pk', 'trackid': 'name'}
    invoiceid = HyperlinkedPathRelatedField('invoices-detail', read_only=True)
    trackid = HyperlinkedPathRelatedField('tracks-detail', read_only=True)

    class Meta:
        model = InvoiceItems
        fields = ('invoiceid', 'trackid', 'unitprice', 'quantity', 'pk')
