import { useState } from "react";
import api from "../api";

export default function RegisterYouth() {
  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await api.post("/", form); // no token sent
      localStorage.setItem("token", res.data.token); // save token returned
      alert("Registered successfully");
      // Optional: redirect to Youth List or Dashboard
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <h2>Youth convention-Nakuru</h2>
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