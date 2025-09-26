function Event({ event, onDelete, onEdit, currentUser, onJoin, onLeave }) {
  const date = new Date(event.date).toLocaleString("en-US");

  const isOrganizer = currentUser?.user === event.organizer;
  const hasJoined = event.participants.includes(currentUser?.user);

  return (
    <div className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <p>📍 {event.location}</p>
      <p>📅 {date}</p>
      <p>👥 Capacity: {event.capacity}</p>
      <p>✅ Participants: {event.participants.length}</p>
      <p><small>Organizer: {isOrganizer?"You":event.organizer}</small></p>

      <div className="event-buttons">
        {!isOrganizer && (
          hasJoined ? (
            <button className="btn leave-btn" onClick={() => onLeave(event.id)}>🚪 Leave</button>
          ) : (
            <button className="btn join-btn" onClick={() => onJoin(event.id)}>✅ Join</button>
          )
        )}

        {isOrganizer && (
          <>
            <button className="btn edit-btn" onClick={() => onEdit(event.id)}>✏️ Edit</button>
            <button className="btn delete-btn" onClick={() => onDelete(event.id)}>🗑️ Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Event;

