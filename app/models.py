# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Artists(models.Model):
    # Field name made lowercase.
    artistid = models.AutoField(db_column='ArtistId', primary_key=True)
    # Field name made lowercase. This field type is a guess.
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'artists'


class Employees(models.Model):
    # Field name made lowercase.
    employeeid = models.AutoField(db_column='EmployeeId', primary_key=True)
    # Field name made lowercase. This field type is a guess.
    lastname = models.TextField(db_column='LastName')
    # Field name made lowercase. This field type is a guess.
    firstname = models.TextField(db_column='FirstName')
    # Field name made lowercase. This field type is a guess.
    title = models.TextField(db_column='Title', blank=True, null=True)
    # Field name made lowercase.
    reportsto = models.ForeignKey('self', db_column='ReportsTo',
                                  on_delete=models.SET_NULL, blank=True, null=True)
    # Field name made lowercase.
    birthdate = models.DateTimeField(db_column='BirthDate', blank=True, null=True)
    # Field name made lowercase.
    hiredate = models.DateTimeField(db_column='HireDate', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    address = models.TextField(db_column='Address', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    city = models.TextField(db_column='City', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    state = models.TextField(db_column='State', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    country = models.TextField(db_column='Country', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    postalcode = models.TextField(db_column='PostalCode', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    phone = models.TextField(db_column='Phone', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    fax = models.TextField(db_column='Fax', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    email = models.TextField(db_column='Email', blank=True, null=True)

    class Meta:
        db_table = 'employees'


class Customers(models.Model):
    # Field name made lowercase.
    customerid = models.AutoField(db_column='CustomerId', primary_key=True)
    # Field name made lowercase. This field type is a guess.
    firstname = models.TextField(db_column='FirstName')
    # Field name made lowercase. This field type is a guess.
    lastname = models.TextField(db_column='LastName')
    # Field name made lowercase. This field type is a guess.
    company = models.TextField(db_column='Company', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    address = models.TextField(db_column='Address', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    city = models.TextField(db_column='City', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    state = models.TextField(db_column='State', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    country = models.TextField(db_column='Country', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    postalcode = models.TextField(db_column='PostalCode', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    phone = models.TextField(db_column='Phone', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    fax = models.TextField(db_column='Fax', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    email = models.TextField(db_column='Email')
    # Field name made lowercase.
    supportrepid = models.ForeignKey(
        Employees, on_delete=models.SET_NULL, db_column='SupportRepId', blank=True, null=True)

    class Meta:
        db_table = 'customers'


class Invoices(models.Model):
    # Field name made lowercase.
    invoiceid = models.AutoField(db_column='InvoiceId', primary_key=True)
    # Field name made lowercase.
    customerid = models.ForeignKey(Customers, on_delete=models.SET_NULL,
                                   db_column='CustomerId', null=True)
    invoicedate = models.DateTimeField(db_column='InvoiceDate')  # Field name made lowercase.
    # Field name made lowercase. This field type is a guess.
    billingaddress = models.TextField(db_column='BillingAddress', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    billingcity = models.TextField(db_column='BillingCity', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    billingstate = models.TextField(db_column='BillingState', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    billingcountry = models.TextField(db_column='BillingCountry', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    billingpostalcode = models.TextField(db_column='BillingPostalCode', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    total = models.TextField(db_column='Total')

    class Meta:
        db_table = 'invoices'


class MediaTypes(models.Model):
    # Field name made lowercase.
    mediatypeid = models.AutoField(db_column='MediaTypeId', primary_key=True)
    # Field name made lowercase. This field type is a guess.
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'media_types'


class Genres(models.Model):
    # Field name made lowercase.
    genreid = models.AutoField(primary_key=True, db_column='GenreId')
    # Field name made lowercase. This field type is a guess.
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'genres'


class Tracks(models.Model):
    trackid = models.AutoField(db_column='TrackId', primary_key=True)  # Field name made lowercase.
    # Field name made lowercase. This field type is a guess.
    name = models.TextField(db_column='Name')
    # Field name made lowercase.
    albumid = models.ForeignKey('Albums', db_column='AlbumId',
                                on_delete=models.CASCADE, blank=True, null=True)
    # Field name made lowercase.
    mediatypeid = models.ForeignKey(MediaTypes, on_delete=models.SET_NULL,
                                    db_column='MediaTypeId', null=True)
    # Field name made lowercase.
    genreid = models.ForeignKey(Genres, on_delete=models.SET_NULL,
                                db_column='GenreId', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    composer = models.TextField(db_column='Composer', blank=True, null=True)
    milliseconds = models.IntegerField(db_column='Milliseconds')  # Field name made lowercase.
    # Field name made lowercase.
    bytes = models.IntegerField(db_column='Bytes', blank=True, null=True)
    # Field name made lowercase. This field type is a guess.
    unitprice = models.TextField(db_column='UnitPrice')

    class Meta:
        db_table = 'tracks'


class Playlists(models.Model):
    # Field name made lowercase.
    playlistid = models.AutoField(db_column='PlaylistId', primary_key=True)
    # Field name made lowercase. This field type is a guess.
    name = models.TextField(db_column='Name', blank=True, null=True)

    class Meta:
        db_table = 'playlists'


class PlaylistTrack(models.Model):
    id = models.AutoField(primary_key=True)
    # Field name made lowercase.
    playlistid = models.ForeignKey(Playlists, on_delete=models.CASCADE, db_column='PlaylistId')
    # Field name made lowercase.
    trackid = models.ForeignKey(Tracks, on_delete=models.CASCADE, db_column='TrackId')

    class Meta:
        db_table = 'playlist_track'
        unique_together = (('playlistid', 'trackid'),)


class Albums(models.Model):
    albumid = models.AutoField(db_column='AlbumId', primary_key=True)  # Field name made lowercase.
    # Field name made lowercase. This field type is a guess.
    title = models.TextField(db_column='Title')
    # Field name made lowercase.
    artistid = models.ForeignKey(Artists, on_delete=models.CASCADE, db_column='ArtistId')

    class Meta:
        db_table = 'albums'


class InvoiceItems(models.Model):
    # Field name made lowercase.
    invoiceitemid = models.AutoField(db_column='InvoiceLineId', primary_key=True)
    # Field name made lowercase.
    invoiceid = models.ForeignKey(Invoices, on_delete=models.CASCADE, db_column='InvoiceId')
    # Field name made lowercase.
    trackid = models.ForeignKey(Tracks, on_delete=models.SET_NULL, db_column='TrackId', null=True)
    # Field name made lowercase. This field type is a guess.
    unitprice = models.TextField(db_column='UnitPrice')
    quantity = models.IntegerField(db_column='Quantity')  # Field name made lowercase.

    class Meta:
        db_table = 'invoice_items'
