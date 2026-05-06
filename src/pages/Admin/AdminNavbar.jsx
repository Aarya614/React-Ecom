import { Link, useNavigate } from "react-router-dom";
import "../User/Navbar.css"; 

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ FIX: Only delete the login session, NOT the whole database!
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("Role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="navbar" style={{ backgroundColor: "#1e293b" }}>
      <h2 className="logo" style={{ color: "white", margin: 0 }}>Admin Panel</h2>

      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/admin/dashboard" style={{ color: "white", textDecoration: "none", fontWeight: "600" }}>Dashboard</Link>
        <Link to="/admin/users" style={{ color: "white", textDecoration: "none", fontWeight: "600" }}>Users</Link>
        <Link to="/admin/products" style={{ color: "white", textDecoration: "none", fontWeight: "600" }}>Products</Link>
        <Link to="/admin/orders" style={{ color: "white", textDecoration: "none", fontWeight: "600" }}>Orders</Link>

        <button onClick={handleLogout} style={{ background: "#ef4444", color: "white", marginLeft: "10px" }}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default AdminNavbar;