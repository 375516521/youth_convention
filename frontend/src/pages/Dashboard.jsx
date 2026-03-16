import { useEffect, useState } from "react";
import api from "../api"; // <-- go up one folder

export default function Dashboard() {
  const [youth, setYouth] = useState([]);

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

  const total = youth.length;
  const checkedIn = youth.filter(y => y.checkedIn).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Registered: {total}</p>
      <p>Checked In: {checkedIn}</p>

      <h3>Recent Registrations</h3>
      {youth.slice(0, 5).map(y => (
        <div key={y._id}>
          {y.fullName} - {y.congregation}
        </div>
      ))}
    </div>
  );
}