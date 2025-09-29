import { useNavigate } from "react-router-dom";

function ProfileStats({profile,events,isPublic=false})
{
    const navigate = useNavigate();


    const getAllParticipants = (events) =>{
        let allParticipants = 0;
        events.forEach(event => {
        allParticipants +=event.participants.length
        });
        return allParticipants
  }

    return (
        <div className="profile-page">
        <div className="profile-header">
            <div className="profile-avatar">
            <img src="/default-avatar.png" alt="User avatar" />
            </div>
            <div className="profile-info">
            <h1>{profile.first_name} {profile.last_name}</h1>
            <p className="role">{profile.role}</p>
            <p className="bio">{profile.bio || "No bio yet"}</p>
            </div>
        </div>

        <div className="profile-stats">
            <div className="stat-card">
            <h3>{events.filter(e => e.status==="finished").length}</h3>
            <p>Finished Events</p>
            </div>
            <div className="stat-card">
            <h3>{getAllParticipants(events)}</h3>
            <p>Total Participants</p>
            </div>
            <div className="stat-card">
            <h3>{events.filter(e => e.status==="active").length}</h3>
            <p>Upcoming Events</p>
            </div>
        </div>

        {
        !isPublic?(<div className="profile-actions">
            <button onClick={() => navigate("/edit-profile/")} className="edit-btn">Edit Profile</button>
            {profile.role==="organizer"?<button onClick={() =>navigate("/events-dashbord/")} className="create-btn">DashBord</button>:""}
        </div>
        ):""
        }
        </div>
    );
}

export default ProfileStats