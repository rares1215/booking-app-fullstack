import { useEffect, useState } from "react"
import api from "../api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function EditEvent() {
    const {id} = useParams();
    const [errors,setErrors] = useState({});
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [date,setDate] = useState("");
    const [location, setLocation ] = useState("")
    const [capacity, setCapacity] = useState(0);


    useEffect(() =>{
        api.get(`/events/${id}/`)
        .then((res) =>{
            setTitle(res.data.title);
            setDescription(res.data.description);
            setDate(res.data.date.slice(0,16));
            setLocation(res.data.location);
            setCapacity(res.data.capacity);
        }).catch((err) => alert(err));
    }, [id]);


    const editEvent = (e) =>{
        e.preventDefault();
        api.put(`/events/${id}/`, {title,description,date,location,capacity})
        .then((res) =>{
            if(res.status===200) navigate("/events/");
        }).catch((err) =>{
            if(err.response && err.response.data) setErrors(err.response.data);
            else("Something went wrong!");
        })
    }

 return (
    <div className="create-event-page">
      <div className="create-event-card">
        <h1>Update Event</h1>
        {Object.keys(errors).length > 0 && (
            <div className="error-container">
                {Object.entries(errors).map(([key, value]) => (
                    <p key={key} className="error-msg">{value}</p>
                ))}
            </div>
        )}
        <form className="create-event-form" onSubmit={editEvent}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Enter event title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            placeholder="Write a short description..."
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="date">Date & Time</label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            autoComplete="off"
            value={location}
            placeholder="Event location"
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            min="1"
            onChange={(e) => setCapacity(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">Update Event</button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent