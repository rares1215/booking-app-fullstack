import { useEffect, useState } from "react";
import "../styles/DashBord.css"
import { useNavigate } from "react-router-dom";
import api from "../api";


function DashBord()
{
    const [events, setEvents] = useState([]);
    const [profile,setProfile] = useState({});
    const navigate = useNavigate();


    useEffect(() =>{
        getProfile();
    },[]);

    const getProfile = () =>{
        api.get("users/profile/")
        .then((res) =>{
            if(res.status===200) setProfile(res.data);
            else console.log(res.status);
        }).catch((err) => alert(err));
    }

    useEffect(()=>{
        if(profile.user){
            api.get(`events/?organizer=${profile.user}`)
            .then((res) =>{
                if (res.status===200) setEvents(res.data);
                else console.log(res.data);
            }).catch((err) => alert(err));
        }
    },[profile.user])


    const avgAttendance = (events) => {
        if (events.length === 0) return 0;
        let total = 0;
        events.forEach(event => {
            if (event.capacity) {
            total += (event.participants.length / event.capacity) * 100;
            }
        });
        return (total / events.length).toFixed(1);

    }

    return (
        <div className="dashboard-page">
        <h1>Organizer Dashboard</h1>

        <div className="dashboard-stats">
            <div className="dash-card">
            <h3>{events.length}</h3>
            <p>Total Events</p>
            </div>
            <div className="dash-card">
            <h3>4.95</h3>
            <p>Average rating</p>
            </div>
            <div className="dash-card">
            <h3>{avgAttendance(events)}%</h3>
            <p>Average Attendance</p>
            </div>
        </div>

        <div className="dashboard-section">
            <h2>Upcoming Events</h2>
            <ul className="event-list">
                {events.filter(e => e.status==="active").slice(0,3).map(ev =>(
                    <li key={ev.id}>
                        {ev.title} - {ev.participants.length}/{ev.capacity} 👥participants
                    </li>
                ))}
            </ul>
        </div>
        <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="actions">
            <button onClick={() => navigate("/create-event/")} className="create-btn">➕ Create Event</button>
            <button onClick={() => navigate("/my-events/")} className="manage-btn">⚙️ Manage Events</button>
            </div>
        </div>
        </div>
    );
}

export default DashBord