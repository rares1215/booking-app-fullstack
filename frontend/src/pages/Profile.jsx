import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Profiles.css";
import ProfileStats from "../components/ProfileStats";

function Profile() {
  const [profile, setProfile] = useState({});
  const [events, setEvents] = useState([]);

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

  return <ProfileStats profile={profile} events={events} />
}

export default Profile;
