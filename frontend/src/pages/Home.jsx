import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Organize & Join Events Effortlessly 🎉</h1>
          <p>
            Discover exciting events near you, or create your own! 
            Connect with people, share experiences, and never miss out again.
          </p>
          <div className="hero-buttons">
            <Link to="/events/" className="btn btn-primary">Browse Events</Link>
            <Link to="/register/" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero-events.svg" alt="Events illustration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Eventify?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Quick Setup</h3>
            <p>Create and publish your event in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🌍</span>
            <h3>Find Events</h3>
            <p>Explore events nearby or online tailored to your interests.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Connect</h3>
            <p>Meet like-minded people and grow your network.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📅</span>
            <h3>Stay Organized</h3>
            <p>Track events, participants, and updates seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to host or join your next event?</h2>
        <Link to="/register/" className="btn btn-primary">Join Now</Link>
      </section>
    </div>
  );
}

export default Home;
