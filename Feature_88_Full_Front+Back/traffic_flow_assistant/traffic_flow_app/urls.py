from django.urls import path
from . import views

urlpatterns = [
    path('report-location/', views.post_report_location),
    path('report-cameras/', views.post_report_cameras),
    path('report-incidents/', views.post_report_incidents),
    path('response-incidents/', views.post_report_response_incident),
    path('yandex_afisha/', views.get_events, name='yandex_afisha'),
]