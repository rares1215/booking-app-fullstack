import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/Profiles.css";

function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // preia profilul public
    api.get(`users/profile/${username}/`)
      .then((res) => setProfile(res.data))
      .catch((err) => alert(err.response?.data || err));

    // preia evenimentele create de user
    api.get(`events/?organizer=${username}`)
      .then((res) => setEvents(res.data))
      .catch((err) => alert(err.response?.data || err));
  }, [username]);

  if (!profile.user) return <LoadingSpinner />;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={profile.avatar || "/default-avatar.png"} alt="User avatar" />
        </div>
        <div className="profile-info">
          <h1>{profile.first_name} {profile.last_name}</h1>
          <p className="role">{profile.role?.toUpperCase()}</p>
          <p className="bio">{profile.bio || "No bio yet."}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Events Created</p>
        </div>
        <div className="stat-card">
          <h3>—</h3>
          <p>Total Participants</p>
        </div>
        <div className="stat-card">
          <h3>{events.length}</h3>
          <p>Upcoming Events</p>
        </div>
      </div>

      {/* Public profile nu afișează butoane */}
    </div>
  );
}

export default PublicProfile;
