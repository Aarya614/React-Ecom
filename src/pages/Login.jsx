import React, { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({ email: "", pass: "" });

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

    const exist = users.find(
      (i) => i.email === user.email && i.pass === user.pass,
    );

    if (!exist) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("Role", "User");
    localStorage.setItem("loggeduser", JSON.stringify(exist));

    alert("Login successful");

    window.location.href = "/user";
  };

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>
        <center>Login Page</center>
      </h1>

      <form style={{ textAlign: "center" }} onSubmit={handlesubmit}>
        <input type="email" name="email" onChange={handlechange} required />
        <br />
        <br />

        <input type="password" name="pass" onChange={handlechange} required />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
