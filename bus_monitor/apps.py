from django.apps import AppConfig
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '.'))
from BusInfo import BusInfo

class BusMonitorConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bus_monitor'

    def ready(self):
        if not sys.argv[0].endswith('manage.py') or sys.argv[1] == 'runserver':
            print('Getting bus stops and bus routes')
            BusInfo.init()