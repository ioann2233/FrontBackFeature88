from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest, HttpResponse, JsonResponse
from .models import Incidents, ResponseIncident, Location, Cameras
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.core import serializers
from django.core.exceptions import ValidationError
import logging
import re
import requests
from bs4 import BeautifulSoup

@csrf_exempt
def post_report_location(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_data = Location(**data)
        new_data.save()
        return JsonResponse({'success': True, 'data' : data})
    elif request.method == 'GET':
        try:
            locations = Location.objects.all()
            location_list = [{'id': location.id, 'title': location.title} for location in locations]
            return JsonResponse(location_list, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt # если что удалить
def post_report_incidents(request):

    if request.method == 'POST':
        data = json.loads(request.body)

        location = data.get('location_id')

        match = re.match(r"(\d+),", location)
        if match:
            number = int(match.group(1))
        location_id = number
        type = data.get('type')
        parts = re.split(r'[,.\n? ]+', type)
        type_inc = parts[0]
        title = parts[1]
        text = data.get('description')
        incident = Incidents(
            title=title,
            type_inc=type_inc,
            location_id=location_id,
            text=text,
            status = True
        )
        incident.save()
        return JsonResponse({"message": "Incident created successfully"})

    elif request.method == 'GET':
        try:
            incidents = Incidents.objects.all()
            incidents_list = [
                {
                    'id': incident.id,
                    'title': incident.title,
                    'location': incident.location.title,  # Access location title
                    'text': incident.text,
                    'status': incident.status,
                    'creature': incident.creature.isoformat(),  # Format datetime
                } for incident in incidents]
            return JsonResponse(incidents_list, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)


def post_report_response_incident(request):
    if request.method == 'POST':
        try:
            incident_id = int(request.POST.get('incident_id'))
            response_id = int(request.POST.get('response_id'))
            action = request.POST.get('action')

            incident = get_object_or_404(Incidents, pk=incident_id)
            response = get_object_or_404(ResponseIncident, pk=response_id, incident=incident)

            if action == 'like':
                response.likes += 1
            elif action == 'dislike':
                response.dislikes += 1
            else:
                return HttpResponseBadRequest("Invalid action. Use 'like' or 'dislike'.")

            response.save()
            return JsonResponse({'success': True, 'likes': response.likes, 'dislikes': response.dislikes})

        except (ValueError, KeyError):
            return HttpResponseBadRequest("Invalid request data.")
    elif request.method == 'GET':
        try:
            responses = ResponseIncident.objects.all()
            data = serializers.serialize('json', responses)
            return HttpResponse(data, content_type='application/json')
        except ValueError:
            return HttpResponseBadRequest("Invalid incident ID.")
    else:
        return HttpResponseBadRequest("Only POST requests are allowed.")

def post_report_cameras(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Валидация данных - проверка на обязательные поля
            required_fields = ['location_id', 'ip_address']
            if not all(field in data for field in required_fields):
                return HttpResponseBadRequest("Missing required fields: location_id and ip_address are required.")

            # Проверка существования Location
            try:
                location = Location.objects.get(pk=data['location_id'])
            except Location.DoesNotExist:
                return HttpResponseBadRequest(f"Location with ID {data['location_id']} does not exist.")
            except KeyError:
                return HttpResponseBadRequest("Invalid JSON data: 'location_id' is missing.")


            # Валидация IP-адреса (можно добавить более строгую проверку)
            ip_address = data['ip_address']
            if not isinstance(ip_address, str):
                return HttpResponseBadRequest("Invalid ip_address: must be a string")


            # Создание объекта Cameras и сохранение
            try:
                camera = Cameras(location=location, ip_address=ip_address)
                camera.full_clean() # Выполняет валидацию модели перед сохранением
                camera.save()

                # Возвращаем JSON-ответ с данными новой камеры
                response_data = {
                    'id': camera.id,
                    'location_id': camera.location_id,
                    'ip_address': camera.ip_address,
                }
                return JsonResponse(response_data, status=201)

            except ValidationError as e:
                error_messages = [str(error) for error in e.message_dict.values()]
                return HttpResponseBadRequest(f"Validation error: {', '.join(error_messages)}") #Возвращает сообщение о конкретных ошибках валидации

            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)

        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON data")
    elif request.method == 'GET':
        try:
            camera_id = request.GET.get('id')

            if camera_id:
                # Получение конкретной камеры по ID
                try:
                    camera = Cameras.objects.get(pk=camera_id)
                    camera_data = {
                        'id': camera.id,
                        'location_id': camera.location_id,
                        'ip_address': camera.ip_address,
                    }
                    return JsonResponse(camera_data)
                except Cameras.DoesNotExist:
                    return HttpResponseBadRequest(f"Camera with ID {camera_id} not found.")

            else:
                # Получение списка всех камер
                cameras = Cameras.objects.all()
                camera_list = [{
                    'id': camera.id,
                    'location_id': camera.location_id,
                    'ip_address': camera.ip_address,
                } for camera in cameras]
                return JsonResponse(camera_list, safe=False)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return HttpResponseBadRequest("Method not allowed")


def get_events(request):
    url = "https://afisha.yandex.ru/krasnodar/events"

    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        events = []
        # Find all event cards (THIS SELECTOR IS CRITICAL - REPLACE IF NECESSARY)
        event_cards = soup.find_all("div", class_="Root-sc-1x07jll-0")  # **ADJUST THIS SELECTOR**

        for card in event_cards:
            try:
                event_data = {}

                # Extract title
                title_element = card.find("h2", class_="Title-fq4hbj-3")
                event_data["title"] = title_element.text.strip() if title_element else "N/A"

                # Extract date and time
                datetime_element = card.find("li", class_="DetailsItem-fq4hbj-1")
                event_data["datetime"] = datetime_element.text.strip() if datetime_element else "N/A"

                # Extract location
                location_element = card.find("a", class_="PlaceLink-fq4hbj-2")
                event_data["location"] = location_element.text.strip() if location_element else "N/A"

                # Extract URL (this might need adjustment depending on how the URL is structured)
                url_element = card.find("a", class_="EventLink-sc-1x07jll-2")
                base_url = "https://afisha.yandex.ru"
                event_data["url"] = base_url + url_element["href"] if url_element else "N/A"


                # Extract Price (optional)
                price_element = card.find("span", class_="PriceBlock-njdnt8-11")
                event_data["price"] = price_element.text.strip() if price_element else "N/A"

                events.append(event_data)

            except (AttributeError, KeyError) as e:
                print(f"Error parsing event card: {e}") #Log the error, this allows easier debugging
                continue #Skip to the next card if something is missing

        return JsonResponse(events, safe=False)

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

