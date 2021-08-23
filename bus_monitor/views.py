import os
from django.shortcuts import render
from django.http.response import JsonResponse
from BusInfo import BusInfo

# Create your views here.

#from django.http import HttpResponse
#def index(request):
#    return HttpResponse("Hello, world. You're at the polls index.")

def index(request):
    token = os.getenv('GMAP_TOKEN')
    params = {'token': token}
    return render(request, 'bus_monitor/index.html', params)

def data_json(request):
    b = BusInfo.update()
    bus_info = b.to_dict(orient='index')
    #return JsonResponse(bus_info, safe=False, json_dumps_params={'ensure_ascii': False})
    return JsonResponse(bus_info, safe=False)
