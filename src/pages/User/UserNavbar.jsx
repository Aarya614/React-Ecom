import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");

  const handleLogout = () => {
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("Role");
    navigate("/login", { replace: true });
  };

  if (role !== "User") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <nav style={{ display: "flex", gap: 30, paddingLeft: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/user">Dashboard</Link>
        <Link to="/cart">Cart</Link>

        {/* ✅ Add here */}
        <Link to="/orders">My Orders</Link>

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default UserNavbar;