import { useEffect, useState } from "react";
import api from "../api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { QRCodeCanvas } from "qrcode.react";

export default function YouthList() {
  const [youth, setYouth] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [adminKey, setAdminKey] = useState("");

  // Prompt admin key on refresh
  useEffect(() => {
    const key = prompt("Enter admin secret key:");
    if (!key) {
      alert("Admin key required");
      return;
    }

    setAdminKey(key);
    fetchYouth(key);
  }, []);

  // Fetch youth
  const fetchYouth = async (key) => {
    try {
      const res = await api.get("/", {
        headers: { "x-admin-key": key },
      });
      setYouth(res.data);
    } catch (err) {
      alert("Invalid admin key");
    }
  };

  // Check-in
  const checkIn = async (id) => {
    try {
      await api.patch(`/${id}/checkin`, null, {
        headers: { "x-admin-key": adminKey },
      });

      fetchYouth(adminKey);
    } catch {
      alert("Check-in failed");
    }
  };

  // Delete
  const deleteYouth = async (id) => {
    if (!window.confirm("Delete this youth?")) return;

    try {
      await api.delete(`/${id}`, {
        headers: { "x-admin-key": adminKey },
      });

      fetchYouth(adminKey);
    } catch {
      alert("Delete failed");
    }
  };

  // Search
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

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(youth);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Youth");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "YouthConventionList.xlsx");
  };

  // Print badge
  const printBadge = (y) => {
    const badgeWindow = window.open("", "_blank");

    badgeWindow.document.write(`
      <html>
      <body style="text-align:center;font-family:Arial">
      <h2>Youth Convention</h2>
      <h3>${y.fullName}</h3>
      <p>${y.congregation}</p>
      <p>${y.phone}</p>
      <p>ID: ${y._id}</p>
      <script>
        window.print();
      </script>
      </body>
      </html>
    `);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Youth List (Admin)</h2>

      {/* SEARCH + EXPORT */}

      <div style={{ marginBottom: "20px" }}>
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

        <button
          onClick={exportExcel}
          style={{ marginLeft: "20px", background: "#28a745", color: "white" }}
        >
          Export Excel
        </button>
      </div>

      {/* LIST */}

      {youth.length === 0 ? (
        <p>No youth found</p>
      ) : (
        youth.map((y) => (
          <div
            key={y._id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{y.fullName}</strong>
              <br />
              {y.congregation}
              <br />
              {y.phone}
            </div>

            {/* QR CODE */}

            <QRCodeCanvas value={y._id} size={70} />

            <div>
              {!y.checkedIn ? (
                <button onClick={() => checkIn(y._id)}>Check In</button>
              ) : (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Checked In
                </span>
              )}

              <button
                onClick={() => deleteYouth(y._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>

              <button
                onClick={() => printBadge(y)}
                style={{ marginLeft: "10px" }}
              >
                Print Badge
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}