function Event({ event }) {
  const date = new Date(event.date).toLocaleString("en-US");

  return (
    <div className="event-card">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-description">{event.description}</p>
      <p>📍 Location: {event.location}</p>
      <p>📅 Date: {date}</p>
      <p>👥 Capacity: {event.capacity}</p>
      <p>✅ Participants: {event.participants.length}</p>
      <p>
        <small>Organizer: {event.organizer}</small>
      </p>
      <p className={`event-status ${event.status}`}>
        {event.status === "active" ? "🟢 Active" : "🔴 Finished"}
      </p>
    </div>
  );
}

export default Event;
