import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    // Fails safely
  }

  const handleLogout = () => {
    // ✅ FIX: Only delete the login session, NOT the whole database!
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("Role");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        Flipkart Clone
      </Link>
      
      <input type="text" placeholder="Search for products..." />

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {role === "User" ? (
          <>
            <span style={{ fontWeight: "600" }}>Hi, {user?.ename || "User"}</span>
            <button onClick={() => navigate("/cart")}>Cart</button>
            <button onClick={() => navigate("/orders")}>Orders</button>
            <button onClick={handleLogout} style={{ background: "#ef4444", color: "white" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button 
              onClick={() => navigate("/register")} 
              style={{ background: "var(--accent)", color: "white" }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserNavbar;