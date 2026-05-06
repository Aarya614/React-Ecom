import { Navigate } from "react-router-dom";

function Protect({ children, role }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    // Fails safely if local storage is corrupted
  }

  const currentRole = localStorage.getItem("Role");

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (role && currentRole !== role) {
    return (
      <Navigate
        to={currentRole === "Admin" ? "/admin/dashboard" : "/user"}
        replace
      />
    );
  }


  return children;
}

export default Protect;