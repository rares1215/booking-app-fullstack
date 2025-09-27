import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/ModalParticipants.css";

function ModalParticipants({ event }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="participants-btn" onClick={() => setShowModal(true)}>
        👥 Show Participants
      </button>

      {showModal &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Participants for {event.title}</h3>
              <ul>
                {event.participants.length > 0 ? (
                  event.participants.map((username, idx) => (
                    <li key={idx}>
                      <Link to={`/profile/${username}`} className="participant-link">
                        {username}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>No participants yet.</p>
                )}
              </ul>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default ModalParticipants;
