import { useState } from "react";
import axios from "axios";

export default function RegisterYouth() {
  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/youth", form);
    alert("Registered successfully");
  };

  return (
    <div>
      <h2>Register Youth</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="congregation" placeholder="Congregation" onChange={handleChange} />
      <input name="talent" placeholder="Talent" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="allergies" placeholder="Allergies" onChange={handleChange} />
      <input name="mpesaCode" placeholder="Mpesa Code" onChange={handleChange} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
