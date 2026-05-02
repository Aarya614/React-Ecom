// import React from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";

// function UserNavbar() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("Role");

//   const handleLogout = () => {
//     localStorage.removeItem("loggeduser");
//     localStorage.removeItem("Role");
//     navigate("/login", { replace: true });
//   };

//   if (role !== "User") {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div>
//       <nav style={{ display: "flex", gap: 30, paddingLeft: 20 }}>
//         <Link to="/">Home</Link>
//         <Link to="/user">Dashboard</Link>

//         {/* 🔥 CART */}
//         <Link to="/cart">Cart</Link>

//         <button onClick={handleLogout}>Logout</button>
//       </nav>
//     </div>
//   );
// }

// export default UserNavbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: 20 }}>
      <Link to="/user">Dashboard</Link>
      <Link to="/cart">Cart</Link>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default UserNavbar;