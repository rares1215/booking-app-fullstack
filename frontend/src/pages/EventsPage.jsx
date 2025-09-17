import { useEffect, useState } from "react"
import api from "../api";
import Event from "../components/Event"
import "../styles/EventsPage.css"


function EventsPage() {
    
    const [events, setEvents] = useState([]);


    useEffect(() =>{
        getEvents();
    },[])


    const getEvents = () =>{
        api.get("events/")
        .then((res) =>{
            if(res.status===200) setEvents(res.data);
        }).catch((err) => alert(err))
    }



  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => <Event event={event} key={event.id} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}

export default EventsPage