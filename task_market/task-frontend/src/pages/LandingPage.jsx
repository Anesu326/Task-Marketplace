import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "Arial", padding: 40 }}>
      
      {/* HERO */}
      <section style={{ textAlign: "center", marginBottom: 60 }}>
        <h1 style={{ fontSize: 48 }}>Earn Money From Local Tasks</h1>
        <p style={{ fontSize: 20, color: "gray" }}>
          Post tasks. Bid for work. Get things done faster.
        </p>

        <div style={{ marginTop: 30 }}>
          <Link to="/register">
            <button style={{ padding: 15, marginRight: 10 }}>
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button style={{ padding: 15 }}>
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ textAlign: "center" }}>How It Works</h2>

        <div style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 30
        }}>
          <div>
            <h3>📌 Post a Task</h3>
            <p>Describe what you need done and set a budget.</p>
          </div>

          <div>
            <h3>💰 Receive Bids</h3>
            <p>Workers compete in real-time to offer the best price.</p>
          </div>

          <div>
            <h3>✅ Choose Worker</h3>
            <p>Select the best bid and get your task completed.</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ marginBottom: 60 }}>
        <h2 style={{ textAlign: "center" }}>Why Use Our Marketplace?</h2>

        <ul style={{ maxWidth: 600, margin: "auto", lineHeight: 2 }}>
          <li>⚡ Real-time live bidding</li>
          <li>📍 Designed for local physical tasks</li>
          <li>💸 Lowest bid wins system</li>
          <li>📱 Mobile friendly experience</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Start earning or get tasks done today</h2>

        <Link to="/register">
          <button style={{ padding: 18, fontSize: 18, marginTop: 20 }}>
            Create Free Account
          </button>
        </Link>
      </section>

    </div>
  );
}