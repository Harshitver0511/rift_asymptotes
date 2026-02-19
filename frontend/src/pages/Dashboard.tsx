import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputSection from "../components/InputSection";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  html_url: string;
}

function Dashboard() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setError(err.message);
        setLoading(false);
        // Redirect to login if not authenticated
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    fetch("http://localhost:5000/auth/logout", { credentials: "include" })
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !user) {
    return null; // Will redirect to login
  }

  return (
    <div className="dashboard">
      {/* Header with user info */}
      <header className="dashboard-header">
        <div className="logo">
          <h2>CI/CD Healing Agent</h2>
        </div>
        <div className="user-section">
          {user && (
            <>
              <img
                src={user.avatar_url}
                alt={user.login}
                className="user-avatar"
              />
              <span className="user-name">{user.name || user.login}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-content">
        <section className="hero">
          <div className="hero-content">
            <h1>
              autonomous ci/cd <br />
              healing agent.
            </h1>
            <p>
              an autonomous devops agent that detects, fixes, and verifies
              pipeline failures.
            </p>
          </div>
        </section>

        <section className="form-container">
          <InputSection />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
