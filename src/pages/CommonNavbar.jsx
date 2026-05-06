import { Link, useNavigate } from "react-router-dom";

function CommonNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("Role");

  const handleLogout = () => {
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("Role");
    navigate("/login");
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: 30, paddingLeft: 20 }}>
        <Link to="/">Home</Link>

        {!role && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {role === "User" && (
          <>
            <Link to="/user">Dashboard</Link>
            <Link to="/user/profile">Profile</Link>
          </>
        )}

        {role === "Admin" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Manage Users</Link>
          </>
        )}

        {role && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </div>
  );
}

export default CommonNavbar;
