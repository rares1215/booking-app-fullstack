import { useEffect, useState } from "react"
import api from "../api";
import Event from "../components/Event"
import "../styles/EventsPage.css"


function EventsPage() {
    
    const [events, setEvents] = useState([]);
    const [profile,setProfile] = useState(null)

    useEffect(() =>{
        getEvents();
        getProfile();
    },[])


    const getEvents = () =>{
        api.get("events/")
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


  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => <Event 
          event={event} 
          onDelete={handleDelete} 
          currentUser={profile} 
          key={event.id} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}

export default EventsPage