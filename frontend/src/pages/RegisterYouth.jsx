import { useState } from "react";
import api from "../api"; // ensure api.js has baseURL: "http://localhost:5000/api/youth"

export default function RegisterYouth() {
  const [form, setForm] = useState({
    fullName: "",
    congregation: "",
    talent: "",
    phone: "",
    allergies: "",
    mpesaCode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const res = await api.post("/", form); // POST to /api/youth
      if (res.data.token) localStorage.setItem("token", res.data.token);
      alert("Registered successfully");
      // Optionally redirect
      // window.location.href = "/youth-list";
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register Youth</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
      />
      <input
        name="congregation"
        placeholder="District - Congregation"
        value={form.congregation}
        onChange={handleChange}
      />
      <input
        name="talent"
        placeholder="Talent"
        value={form.talent}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        name="allergies"
        placeholder="Allergies"
        value={form.allergies}
        onChange={handleChange}
      />
      <input
        name="mpesaCode"
        placeholder="Mpesa Code"
        value={form.mpesaCode}
        onChange={handleChange}
      />

      <button onClick={submit}>Register</button>
    </div>
  );
}