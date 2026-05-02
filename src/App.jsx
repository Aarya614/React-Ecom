// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import React from "react";

// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Protect from "./pages/Protect";
// import CommonNavbar from "./pages/CommonNavbar";

// import Userindex from "./pages/User/Userindex";
// import UserNavbar from "./pages/User/UserNavbar";

// import AdminNavbar from "./pages/Admin/AdminNavbar";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import ManageUsers from "./pages/Admin/ManageUsers";
// import AdminProduct from "./pages/Admin/AdminProduct";
// import Cart from "./pages/User/Cart";
// function AppContent() {
//   const location = useLocation();

//   // 👇 THIS LINE makes React "use" location
//   const role = localStorage.getItem("Role") + location.pathname;

//   const actualRole = role.replace(location.pathname, "");

//   return (
//     <>
//       {actualRole === "Admin" ? (
//         <AdminNavbar />
//       ) : actualRole === "User" ? (
//         <UserNavbar />
//       ) : (
//         <CommonNavbar />
//       )}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/user"
//           element={
//             <Protect role="User">
//               <Userindex />
//             </Protect>
//           }
//         />

//         <Route
//           path="/admin/dashboard"
//           element={
//             <Protect role="Admin">
//               <AdminDashboard />
//             </Protect>
//           }
//         />

//         <Route
//           path="/admin/users"
//           element={
//             <Protect role="Admin">
//               <ManageUsers />
//             </Protect>
//           }
//         />

//         <Route
//           path="/admin/products"
//           element={
//             <Protect role="Admin">
//               <AdminProduct />
//             </Protect>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <Protect role="User">
//               <Cart />
//             </Protect>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Userindex from "./pages/User/Userindex";
import Cart from "./pages/User/Cart";

import UserNavbar from "./pages/User/UserNavbar";
import CommonNavbar from "./pages/CommonNavbar";

import Protect from "./pages/Protect";

function AppContent() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      {/* Navbar switch */}
      {user ? <UserNavbar /> : <CommonNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/user"
          element={
            <Protect>
              <Userindex />
            </Protect>
          }
        />

        <Route
          path="/cart"
          element={
            <Protect>
              <Cart />
            </Protect>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}