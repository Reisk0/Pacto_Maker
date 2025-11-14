from django.contrib import admin
from django.urls import path
from generador_docs import views  # Importa tus vistas directamente

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('generar/', views.generar_documento, name='generar_documento'),
]