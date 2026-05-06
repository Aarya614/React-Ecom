import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ ename: "", email: "", pass: "" });
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.pass || !user.ename) {
      alert("All fields are required");
      return;
    }

    let users = JSON.parse(localStorage.getItem("User")) || [];
    const exist = users.find((i) => i.email === user.email);

    if (exist) {
      alert("Email already registered! Please log in.");
      navigate("/login");
      return;
    }

    users.push(user);
    localStorage.setItem("User", JSON.stringify(users));

    alert("Registration Complete!");
    navigate("/login");
  };

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="center-title">Create an Account</h1>
      
      <form onSubmit={handlesubmit}>
        <input type="text" name="ename" placeholder="Full Name" onChange={handlechange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handlechange} required />
        <input type="password" name="pass" placeholder="Password" onChange={handlechange} required />
        
        <button type="submit">Register</button>

        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: "600" }}>Login here</Link>
        </p>
      </form>
    </div>
  );
}