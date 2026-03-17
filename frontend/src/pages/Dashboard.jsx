import { useEffect, useState } from "react";
import api from "../api";
import "../dashboard.css";

export default function Dashboard({ adminKey }) {
  const [youth, setYouth] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYouth = async () => {
      try {
        const res = await api.get("/youth", {
          headers: adminKey ? { "x-admin-key": adminKey } : {},
        });

        setYouth(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchYouth();
  }, [adminKey]);

  const total = youth.length;
  const checkedIn = youth.filter((y) => y?.checkedIn).length;
  const notChecked = total - checkedIn;
  const progress =
    total > 0 ? Math.round((checkedIn / total) * 100) : 0;

  const filteredYouth = youth.filter((y) =>
    (y?.fullName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="dashboard">
        <h2 style={{ textAlign: "center" }}>
          Loading dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>Church Event Management System</h1>
      </header>

      <div className="stats">
        <div className="card blue">
          <h3>Total Registered</h3>
          <p>{total}</p>
        </div>
        <div className="card green">
          <h3>Checked In</h3>
          <p>{checkedIn}</p>
        </div>
        <div className="card orange">
          <h3>Not Checked</h3>
          <p>{notChecked}</p>
        </div>
      </div>

      <div className="progress-box">
        <h3>Attendance Progress</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{progress}% Checked In</p>
      </div>

      <div className="search-box">
        <input
          placeholder="Search youth by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recent">
        <h2>Youth List</h2>

        {filteredYouth.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No records found
          </p>
        ) : (
          filteredYouth.slice(0, 10).map((y, index) => (
            <div key={y?._id || index} className="recent-item">
              <strong>{y?.fullName || "N/A"}</strong>
              <span>{y?.congregation || "N/A"}</span>
              <span>{y?.phone || "N/A"}</span>
              <span
                className={
                  y?.checkedIn
                    ? "status-green"
                    : "status-red"
                }
              >
                {y?.checkedIn
                  ? "Checked In"
                  : "Not Checked"}
              </span>
            </div>
          ))
        )}
      </div>

      <footer
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#7f8c8d",
          fontSize: "12px",
        }}
      >
        Developed by Pianist Charles Wambua | Contact:
        0745939344
      </footer>
    </div>
  );
}