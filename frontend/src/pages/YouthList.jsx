import { useEffect, useState } from "react";
import api from "../api";

export default function YouthList() {
  const [youth, setYouth] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");

  const token = localStorage.getItem("token");

  // Fetch youth list
  const fetchYouth = async () => {
    try {
      const res = await api.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setYouth(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  // Check-in youth
  const checkIn = async (id) => {
    try {
      await api.patch(`/${id}/checkin`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchYouth();
      alert("Checked in successfully");
    } catch (err) {
      alert("Check-in failed");
    }
  };

  // Delete youth
  const deleteYouth = async (id) => {
    if (!window.confirm("Are you sure you want to delete this youth?")) return;
    try {
      await api.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchYouth();
      alert("Youth deleted successfully");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Search by phone
  const searchByPhone = async () => {
    if (!searchPhone) return fetchYouth();
    try {
      const res = await api.get(`/search/${searchPhone}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setYouth(res.data);
    } catch (err) {
      alert("Search failed");
    }
  };

  return (
    <div>
      <h2>Youth List</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Search by phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <button onClick={searchByPhone} style={{ marginLeft: "5px" }}>
          Search
        </button>
        <button
          onClick={() => {
            setSearchPhone("");
            fetchYouth();
          }}
          style={{ marginLeft: "5px" }}
        >
          Reset
        </button>
      </div>

      {youth.length === 0 ? (
        <p>No youth found.</p>
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
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => deleteYouth(y._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}