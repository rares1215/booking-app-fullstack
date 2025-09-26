import { useEffect, useState } from "react"
import api from "../api";
import Event from "../components/Event"
import "../styles/EventsPage.css"
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function EventsComponent({filterType=null, filterName=null, pageTitle="Upcoming Events"}) {
    
    const [events, setEvents] = useState([]);
    const [profile,setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>{
        setIsLoading(true); // pornim spinner-ul la fiecare fetch
        Promise.all([getEvents(), getProfile()])
          .finally(() => setIsLoading(false));
    },[filterType,filterName]);

    const getEvents = () =>{
        return api.get(`events/?${filterType || ""}=${filterName || ""}`)
        .then((res) =>{
            if(res.status===200) setEvents(res.data);
        }).catch((err) => alert(err));
    }

    const getProfile = () =>{
      return api.get("users/profile/")
      .then((res) =>{
        setProfile(res.data)
      }).catch((err) => alert(err.response.data));
    }

    const handleDelete = (id) =>{
      setIsLoading(true);
      api.delete(`events/${id}/`)
      .then((res) =>{
        if(res.status===204) getEvents();
      }).catch((err) => alert(err.response.data))
      .finally(() => setIsLoading(false));
    }

    const handleEdit = (id) =>{
      navigate(`/edit-event/${id}/`);
    }

    const onJoin = (id) =>{
      api.post(`/events/${id}/join/`)
      .then((res) =>{
        if(res.status===200) getEvents();
      }).catch((err) => alert(err.response.data.detail));
    }

    const onLeave = (id) =>{
      api.delete(`/events/${id}/leave/`)
      .then(() =>{
        getEvents();
      }).catch((err) => alert(err.response.data.detail));
    }

    // ✅ corect
    if (isLoading) return <LoadingSpinner />;

    return (
      <div className="events-page">
        <h1>{pageTitle}</h1>
        <div className="events-grid">
          {events.length > 0 ? (
            events.map((event) => <Event 
              event={event} 
              onDelete={handleDelete} 
              currentUser={profile} 
              onEdit={handleEdit}
              onJoin={onJoin}
              onLeave={onLeave}
              key={event.id} />)
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    );
}

export default EventsComponent;
