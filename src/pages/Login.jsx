import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({ email: "", pass: "" });
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    const adminmail = "admin@gmail.com";
    const adminpass = "admin";

    if (!user.email || !user.pass) {
      alert("All fields are required");
      return;
    }

    if (user.email === adminmail && user.pass === adminpass) {
      localStorage.setItem("Role", "Admin");
      localStorage.setItem("loggeduser", JSON.stringify(user));
      alert("Admin Login successful");
      window.location.href = "/admin/dashboard"; 
      return;
    }

    let users = JSON.parse(localStorage.getItem("User")) || [];
    const exist = users.find((i) => i.email === user.email && i.pass === user.pass);

    if (!exist) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("Role", "User");
    localStorage.setItem("loggeduser", JSON.stringify(exist));
    alert("Login successful");
    navigate("/"); 
  };

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="center-title">Login Account</h1>

      <form onSubmit={handlesubmit}>
        <input type="email" name="email" placeholder="Email Address" onChange={handlechange} required />
        <input type="password" name="pass" placeholder="Password" onChange={handlechange} required />
        <button type="submit">Login</button>
        
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--primary)", fontWeight: "600" }}>Register here</Link>
        </p>
      </form>
    </div>
  );
}