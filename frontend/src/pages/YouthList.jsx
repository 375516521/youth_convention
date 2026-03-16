import { useEffect, useState } from "react";
import api from "../api";

export default function YouthList() {
  const [youth, setYouth] = useState([]);

  // Fetch youth list
  const fetchYouth = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      const res = await api.get("/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setYouth(res.data);
    } catch (err) {
      console.error("Error fetching youth:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to fetch youth list");
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  // Check-in youth
  const checkIn = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/${id}/checkin`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      fetchYouth(); // refresh list
      alert("Checked in successfully");
    } catch (err) {
      console.error("Check-in error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Check-in failed");
    }
  };

  return (
    <div>
      <h2>Youth List</h2>
      {youth.length === 0 ? (
        <p>No youth registered yet.</p>
      ) : (
        youth.map((y) => (
          <div key={y._id} style={{ marginBottom: "10px" }}>
            <strong>{y.fullName}</strong> - {y.congregation}
            {!y.checkedIn ? (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => checkIn(y._id)}
              >
                Check In
              </button>
            ) : (
              <span style={{ marginLeft: "10px", color: "green" }}>
                Checked In
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}