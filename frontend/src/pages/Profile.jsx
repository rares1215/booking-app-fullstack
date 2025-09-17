import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Profiles.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={profile.avatar || "/default-avatar.png"}
            alt="avatar"
          />
        </div>
        <h1 className="profile-name">
          {profile.first_name} {profile.last_name}
        </h1>
        <p className="profile-role"> role: {profile.role?.toUpperCase()}</p>

        <div className="profile-info">
          <p><strong>Bio:</strong> {profile.bio || "No bio yet."}</p>
          <p><strong>Birthday:</strong> {profile.birthday || "Not set"}</p>
          <p><strong>Username:</strong> {profile.user}</p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile/")}
        >
          Edit Profile
        </button>
        {profile.role==="organizer"?<button className="edit-profile-btn" onClick={() => navigate("/create-event/")}>Create Event</button>:""}
      </div>
    </div>
  );
}

export default Profile;
