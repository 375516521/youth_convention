import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [youth, setYouth] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/youth")
      .then(res => setYouth(res.data));
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
