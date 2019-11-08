from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.urls import reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import (LoginView, LogoutView)
from django.views import generic
from .forms import LoginForm 
 
def index(request):
#    return HttpResponse("Hello, world.")
    return render(request, 'new_orient/index.html')

def home(request):
    return render(request, 'new_orient/home.html')

def projectsearch(request):
    return render(request, 'new_orient/projectsearch.html')

def productsearch(request):
    return render(request, 'new_orient/productsearch.html')

def userconfiguration(request):
    return render(request, 'new_orient/userconfiguration.html')

def purchasesearch(request):
    return render(request, 'new_orient/purchasesearch.html')

def clientsearch(request):
    return render(request, 'new_orient/clientsearch.html')

def suppliersearch(request):
    return render(request, 'new_orient/suppliersearch.html')

def departmentsearch(request):
    return render(request, 'new_orient/departmentsearch.html')

def statemessagelist(request):
    return render(request, 'new_orient/statemessagelist.html')

def projectdetail(request):
    return render(request, 'new_orient/projectdetail.html')

def orient(request):
    return render(request, 'new_orient/orient.html')
    
class Login(LoginView):
    form_class = LoginForm
    template_name = 'new_orient/login.html'
    
class Logout(LoginRequiredMixin, LogoutView):
    template_name = 'new_orient/index.html'
