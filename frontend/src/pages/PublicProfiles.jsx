import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/Profiles.css";
import ProfileStats from "../components/ProfileStats";

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

  return <ProfileStats profile={profile} events={events} isPublic = {true} />
}

export default PublicProfile;
