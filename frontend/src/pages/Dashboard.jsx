import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dashboard) {
    return <h2 style={{ textAlign: "center" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>📚 Dashboard</h1>
          <p>Welcome back! Manage your digital library.</p>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats-grid">
        <div className="stat-card blue">
          <h2>{dashboard.stats.myBooks}</h2>
          <p>My Books</p>
        </div>

        <div className="stat-card green">
          <h2>{dashboard.stats.available}</h2>
          <p>Available</p>
        </div>

        <div className="stat-card orange">
          <h2>{dashboard.stats.borrowed}</h2>
          <p>Borrowed</p>
        </div>

        <div className="stat-card purple">
          <h2>{dashboard.stats.requests}</h2>
          <p>Requests</p>
        </div>
      </div>

      {/* Recent Books */}

      <div className="section">
        <h2>📖 Recent Books</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>

                <td>{book.author}</td>

                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Requests */}

      <div className="section">
        <h2>📥 Recent Requests</h2>

        <table>
          <thead>
            <tr>
              <th>User</th>

              <th>Book</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.requester?.name}</td>

                <td>{req.book?.title}</td>

                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
