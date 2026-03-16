import { useEffect, useState } from "react";
import api from "../api";

export default function YouthList() {
  const [youth, setYouth] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [adminKey, setAdminKey] = useState("");

  // Always prompt on every refresh
  useEffect(() => {
    const key = prompt("Enter admin secret key:");
    if (!key) {
      alert("Admin key required to access this page");
      return;
    }
    setAdminKey(key);
    fetchYouth(key);
  }, []);

  // Fetch youth list
  const fetchYouth = async (key) => {
    try {
      const res = await api.get("/", {
        headers: { "x-admin-key": key },
      });
      setYouth(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Admin access required or invalid key");
    }
  };

  // Check-in youth
  const checkIn = async (id) => {
    try {
      await api.patch(`/${id}/checkin`, null, {
        headers: { "x-admin-key": adminKey },
      });
      fetchYouth(adminKey);
      alert("Checked in successfully");
    } catch {
      alert("Check-in failed");
    }
  };

  // Delete youth
  const deleteYouth = async (id) => {
    if (!window.confirm("Delete this youth?")) return;
    try {
      await api.delete(`/${id}`, {
        headers: { "x-admin-key": adminKey },
      });
      fetchYouth(adminKey);
      alert("Deleted successfully");
    } catch {
      alert("Delete failed");
    }
  };

  // Search by phone
  const searchByPhone = async () => {
    if (!searchPhone) return fetchYouth(adminKey);
    try {
      const res = await api.get(`/search/${searchPhone}`, {
        headers: { "x-admin-key": adminKey },
      });
      setYouth(res.data);
    } catch {
      alert("Search failed");
    }
  };

  return (
    <div>
      <h2>Youth List (Admin)</h2>

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
            fetchYouth(adminKey);
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