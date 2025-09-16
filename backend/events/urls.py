from django.urls import path
from . import views

urlpatterns = [
    path("", views.EventsListView.as_view(), name = "events"),
    path("<int:pk>/", views.EditDeleteEventsView.as_view(), name = "handle-events"),
    path("<int:pk>/join/", views.JoinLeaveEvent.as_view(), name = "join-event"),
    path("<int:pk>/leave/", views.JoinLeaveEvent.as_view(), name = "leave-event"),
    path("<int:pk>/comments/", views.EventCommentsView.as_view(), name = "comments"),
    path("<int:event_pk>/comments/<int:pk>/", views.EditDeleteCommentsView.as_view(), name = "handle-comments"),
]