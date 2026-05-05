import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");

  if (role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("Role");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: 30, paddingLeft: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Manage Users</Link>
        <Link to="/admin/products">Products</Link>

        {/* ✅ Add here */}
        <Link to="/admin/orders">Orders</Link>

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default AdminNavbar;