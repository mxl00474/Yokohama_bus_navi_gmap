from django.urls import path

from . import views

app_name = 'bus_monitor'
urlpatterns = [
    path('', views.index, name='index'),
    path('data', views.data_json, name='data_json'),
]
