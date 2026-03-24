import { useEffect, useState, useRef } from "react";
import api from "../api";
import Badge from "../components/Badge";
import { useReactToPrint } from "react-to-print";

export default function YouthList() {
  const [youth, setYouth] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedYouth, setSelectedYouth] = useState(null);
  const [adminKey, setAdminKey] = useState("");

  const badgeRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => badgeRef.current,
  });

  useEffect(() => {
    const key = prompt("Enter admin secret key:");
    if (!key) {
      alert("Admin key required to access this page");
      return;
    }
    setAdminKey(key);
    fetchYouth(key);
  }, []);

  const fetchYouth = async (key) => {
    try {
      const res = await api.get("/youth", {
        headers: { "x-admin-key": key },
      });
      setYouth(res.data);
    } catch {
      alert("Admin access required or invalid key");
    }
  };

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
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#007bff" }}>Youth List (Admin)</h2>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search by phone"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          style={{ padding: "5px 10px", width: "200px" }}
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

      {/* Youth list */}
      {youth.length === 0 ? (
        <p>No youth found.</p>
      ) : (
        youth.map((y) => (
          <div
            key={y._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{y.fullName}</strong> - {y.congregation}
              <div style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
                Phone: {y.phone} | Talent: {y.talent}
              </div>
            </div>

            <div>
              {!y.checkedIn ? (
                <button onClick={() => checkIn(y._id)}>Check In</button>
              ) : (
                <span style={{ marginRight: "10px", color: "green" }}>Checked In</span>
              )}

              <button
                onClick={() => deleteYouth(y._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => setSelectedYouth(y)}
              >
                Prepare Badge
              </button>
            </div>
          </div>
        ))
      )}

      {/* Badge preview */}
      {selectedYouth && (
        <div style={{ marginTop: "40px" }}>
          <Badge ref={badgeRef} youth={selectedYouth} />
          <button style={{ marginTop: "15px" }} onClick={handlePrint}>
            Print Badge
          </button>
        </div>
      )}
    </div>
  );
}