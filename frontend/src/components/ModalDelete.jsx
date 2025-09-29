import { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/ModalParticipants.css";

function ModalDelete({ event , onDelete}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-btn" onClick={() => setShowModal(true)}>
        🗑️ Delete
      </button>

        {showModal && 
        createPortal(
            <div className="delete-overlay">
            <div className="delete-modal">
                <h3>Delete Event</h3>
                <p>Are you sure you want to delete {event.title}? This action can't be undone!</p>
                <button 
                className="delete-btn-action confirm" 
                onClick={() => onDelete(event.id)}
                >
                Confirm
                </button>
                <button 
                className="delete-btn-action cancel" 
                onClick={() => setShowModal(false)}
                >
                Cancel
                </button>
            </div>
            </div>,
            document.body
        )}
    </>
  );
}

export default ModalDelete;
