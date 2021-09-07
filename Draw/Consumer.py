import json
from .Camera import initSetup, getFingersValue
from django.conf import settings
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import time

class FingerConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

        initSetup()
        while True:
            try:
                d = getFingersValue()
                if not d:
                    break

                if d['Finger'] != '':

                    self.send(json.dumps(d))
            except:
                continue
            #time.sleep(0)
        self.close()


    def receive(self, text_data=None, bytes_data=None):
        pass

    def disconnect(self, code):
        pass