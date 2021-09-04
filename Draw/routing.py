from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from  Draw.Consumer import FingerConsumer

websocket_urlPattern = [
    path("ws/test/", FingerConsumer.as_asgi())
]

