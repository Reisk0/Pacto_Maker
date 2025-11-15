"""
URL configuration for pactoMaker project.
"""
from django.contrib import admin
from django.urls import path, include  # ¡AGREGA 'include' aquí!

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('generador_docs.urls')),  # ¡AGREGA ESTA LÍNEA!
]