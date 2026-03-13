import { useEffect, useState } from "react";
import axios from "axios";

export default function YouthList() {
  const [youth, setYouth] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/youth")
      .then(res => setYouth(res.data));
  }, []);

  const checkIn = async (id) => {
    await axios.patch(`http://localhost:5000/api/youth/${id}/checkin`);
    alert("Checked in");
  };

  return (
    <div>
      {youth.map(y => (
        <div key={y._id}>
          {y.fullName} - {y.congregation}  
          {!y.checkedIn && <button onClick={() => checkIn(y._id)}>Check In</button>}
        </div>
      ))}
    </div>
  );
}
