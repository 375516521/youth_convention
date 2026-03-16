import { useEffect, useState } from "react";
import api from "../api"; // <-- use your Axios instance

export default function YouthList() {
  const [youth, setYouth] = useState([]);

  // Fetch all youth
  const fetchYouth = async () => {
    try {
      const res = await api.get("/"); // protected route
      setYouth(res.data);
    } catch (err) {
      console.error("Error fetching youth:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  // Check-in a youth
  const checkIn = async (id) => {
    try {
      await api.patch(`/${id}/checkin`); // protected route
      alert("Checked in successfully");

      // Refresh the list to update UI
      fetchYouth();
    } catch (err) {
      console.error("Check-in error:", err.response?.data || err.message);
      alert("Check-in failed");
    }
  };

  return (
    <div>
      <h2>Youth List</h2>
      {youth.length === 0 ? (
        <p>No youth registered yet.</p>
      ) : (
        youth.map(y => (
          <div key={y._id} style={{ marginBottom: "10px" }}>
            <strong>{y.fullName}</strong> - {y.congregation}  
            {!y.checkedIn && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => checkIn(y._id)}
              >
                Check In
              </button>
            )}
            {y.checkedIn && <span style={{ marginLeft: "10px", color: "green" }}>Checked In</span>}
          </div>
        ))
      )}
    </div>
  );
}