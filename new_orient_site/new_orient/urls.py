from django.conf.urls import url
from django.urls import path
from . import views

 
app_name = 'new_orient'
urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.Login.as_view(), name='login'),
    path('logout', views.Logout.as_view(), name='logout'),
    path('home', views.home, name='home'),
    path('projectsearch', views.projectsearch, name='projectsearch'),
    path('productsearch', views.productsearch, name='productsearch'),
    path('userconfiguration', views.userconfiguration, name='userconfiguration'),
    path('purchasesearch', views.purchasesearch, name='purchasesearch'),
    path('clientsearch', views.clientsearch, name='clientsearch'),
    path('suppliersearch', views.suppliersearch, name='suppliersearch'),
    path('departmentsearch', views.departmentsearch, name='departmentsearch'),
    path('statemessagelist', views.statemessagelist, name='statemessagelist'),
    path('projectdetail', views.projectdetail, name='projectdetail'),
    path('orient', views.orient, name='orient'),
]