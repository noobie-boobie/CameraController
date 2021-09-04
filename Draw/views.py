from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse

def draw(request):
    return render(request, 'panel.html')

