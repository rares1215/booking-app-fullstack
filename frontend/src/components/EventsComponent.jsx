import { useEffect, useState } from "react"
import api from "../api";
import Event from "../components/Event"
import "../styles/EventsPage.css"
import { useNavigate } from "react-router-dom";

function EventsComponent({filterType=null, filterName=null, pageTitle="Upcoming Events"}) {
    
    const [events, setEvents] = useState([]);
    const [profile,setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>{
        getEvents();
        getProfile();
    },[filterType,filterName]);


    const getEvents = () =>{
        api.get(`events/?${filterType}=${filterName}`)
        .then((res) =>{
            if(res.status===200) setEvents(res.data);
        }).catch((err) => alert(err))
    }

    const getProfile = () =>{
      api.get("users/profile/")
      .then((res) =>{
        setProfile(res.data)
      }).catch((err) => alert(err.response.data));
    }

    const handleDelete = (id) =>{
      api.delete(`events/${id}/`)
      .then((res) =>{
        if(res.status===204) getEvents();
      }).catch((err) => alert(err.response.data));
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

export default EventsComponent