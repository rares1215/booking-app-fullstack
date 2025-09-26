import "../styles/DashBord.css"
import { useNavigate } from "react-router-dom";


function DashBord()
{

    const navigate = useNavigate();


    return (
        <div className="dashboard-page">
        <h1>Organizer Dashboard</h1>

        <div className="dashboard-stats">
            <div className="dash-card">
            <h3>10</h3>
            <p>Total Events</p>
            </div>
            <div className="dash-card">
            <h3>250</h3>
            <p>Total Participants</p>
            </div>
            <div className="dash-card">
            <h3>85%</h3>
            <p>Average Attendance</p>
            </div>
        </div>

        <div className="dashboard-section">
            <h2>Upcoming Events</h2>
            <ul className="event-list">
            <li>🎉 Event A — 50/100 participants</li>
            <li>🎤 Event B — 30/50 participants</li>
            <li>🎓 Event C — 75/120 participants</li>
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