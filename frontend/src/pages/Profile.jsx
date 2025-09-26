import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Profiles.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({});
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => alert(err));
  }, []);

  useEffect(() =>{
    if(profile.user){
      api.get(`events/?organizer=${profile.user}`)
      .then((res) =>{
        setEvents(res.data);
      }).catch((err) => alert(err.response.data));
    }
  }, [profile.user])

return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/default-avatar.png" alt="User avatar" />
        </div>
        <div className="profile-info">
          <h1>{profile.first_name} {profile.last_name}</h1>
          <p className="role">{profile.role}</p>
          <p className="bio">{profile.bio}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Events Created</p>
        </div>
        <div className="stat-card">
          <h3>120</h3>
          <p>Total Participants</p>
        </div>
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Upcoming Events</p>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={() => navigate("/edit-profile/")} className="edit-btn">Edit Profile</button>
        {profile.role==="organizer"?<button onClick={() =>navigate("/events-dashbord/")} className="create-btn">DashBord</button>:""}
      </div>
    </div>
  );
}

export default Profile;
