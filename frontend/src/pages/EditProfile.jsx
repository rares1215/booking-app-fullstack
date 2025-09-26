import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Profiles.css";
import LoadingSpinner from "../components/LoadingSpinner"

function EditProfile() {
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [role, setRole] = useState("attendee");
  const [errors,setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    api.get("users/profile/")
      .then((res) => {
        setBio(res.data.bio || "");
        setBirthday(res.data.birthday || "");
        setRole(res.data.role || "attendee");
        setIsLoading(false);
      }).catch((err) => alert(err))
      .finally(() => setIsLoading(false));
  }, []);

  const updateProfile = (e) => {
    setIsLoading(true)
    e.preventDefault();
    api.put("users/profile/", { bio, birthday, role })
      .then((res) => {
        if (res.status === 200) {
          navigate("/profile/");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if(err.response && err.response.data) setErrors(err.response.data);
        else alert("Something went wrong!");
        setIsLoading(false);
      });
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
        {Object.keys(errors).length > 0 && (
          <div className="error-container">
            {Object.entries(errors).map(([key, value]) => (
              <p key={key} className="error-msg">{value}</p>
            ))}
          </div>
            )}
      <form className="edit-profile-form" onSubmit={updateProfile}>
        <label htmlFor="bio">Bio:</label>
        <textarea
          name="bio"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
        />

        <label htmlFor="birthday">Birthday:</label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        <label htmlFor="role">Role:</label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>

        <button type="submit">Save Changes</button>
        {isLoading?<LoadingSpinner/>:""}
      </form>
    </div>
  );
}

export default EditProfile;
