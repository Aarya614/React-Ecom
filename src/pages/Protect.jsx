// import React from "react";
// import { Navigate } from "react-router-dom";

// function Protect({ children, role }) {
//   let user = null;

//   try {
//     user = JSON.parse(localStorage.getItem("loggeduser"));
//   } catch {
//     user = null;
//   }

//   const currentRole = localStorage.getItem("Role");

//   if (!user) return <Navigate to="/login" replace />;

//   if (role && currentRole !== role) {
//     return (
//       <Navigate
//         to={currentRole === "Admin" ? "/admin/dashboard" : "/user"}
//         replace
//       />
//     );
//   }

//   return children;
// }

// export default Protect;

import React from "react";
import { Navigate } from "react-router-dom";

function Protect({ children }) {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    user = null;
  }

  // ❌ Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow page
  return children;
}

export default Protect;