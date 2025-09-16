import django_filters
from .models import Event


class EventsFilter(django_filters.FilterSet):
    organizer = django_filters.CharFilter(field_name="organizer__username", lookup_expr="iexact")
    class Meta:
        model  = Event
        fields = {
            'capacity' : ['exact', 'lt', 'gt' , 'range'],
            'organizer': ['exact'],
            'date' : ['exact', 'lt' , 'gt'],
            'location' : ['icontains'],
        }