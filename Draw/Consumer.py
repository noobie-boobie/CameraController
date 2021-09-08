import json
from .Camera import initSetup, getFingersValue
from channels.generic.websocket import WebsocketConsumer
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

    def receive(self, text_data=None, bytes_data=None):
        pass

    def disconnect(self, code):
        pass