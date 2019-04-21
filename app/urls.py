from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'artists', views.ArtistsViewSet)
router.register(r'employees', views.EmployeesViewSet)
router.register(r'customer', views.CustomersViewSet)
router.register(r'invoces', views.InvoicesViewSet)
router.register(r'media_types', views.MediaTypesViewSet)
router.register(r'genres', views.GenresViewSet)
router.register(r'tracks', views.TracksViewSet)
router.register(r'playlists', views.PlaylistsViewSet)
router.register(r'playlist_track', views.PlaylistTrackViewSet)
router.register(r'albums', views.AlbumsViewSet)
router.register(r'invoice_items', views.InvoiceItemsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
