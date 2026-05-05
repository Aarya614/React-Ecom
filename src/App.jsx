// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import React from "react";

// import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Protect from "./pages/Protect";
// import CommonNavbar from "./pages/CommonNavbar";

// import Userindex from "./pages/User/Userindex";
// import UserNavbar from "./pages/User/UserNavbar";
// import Checkout from "./pages/Checkout";

// import AdminNavbar from "./pages/Admin/AdminNavbar";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import ManageUsers from "./pages/Admin/ManageUsers";
// import AdminProduct from "./pages/Admin/AdminProduct";
// import Cart from "./pages/User/Cart";
// function AppContent() {
//   const location = useLocation();

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

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protect from "./pages/Protect";
import CommonNavbar from "./pages/CommonNavbar";

import Userindex from "./pages/User/Userindex";
import UserNavbar from "./pages/User/UserNavbar";
import Checkout from "./pages/Checkout";
import Orders from "./pages/User/Orders";

import AdminOrders from "./pages/Admin/AdminOrders";
import AdminNavbar from "./pages/Admin/AdminNavbar";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import AdminProduct from "./pages/Admin/AdminProduct";
import Cart from "./pages/User/Cart";

function AppContent() {
  const location = useLocation();

  const actualRole = localStorage.getItem("Role");

  return (
    <>
      {actualRole === "Admin" ? (
        <AdminNavbar />
      ) : actualRole === "User" ? (
        <UserNavbar />
      ) : (
        <CommonNavbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/user"
          element={
            <Protect role="User">
              <Userindex />
            </Protect>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <Protect role="Admin">
              <AdminDashboard />
            </Protect>
          }
        />

        <Route
          path="/admin/users"
          element={
            <Protect role="Admin">
              <ManageUsers />
            </Protect>
          }
        />

        <Route
          path="/admin/products"
          element={
            <Protect role="Admin">
              <AdminProduct />
            </Protect>
          }
        />

        <Route
          path="/cart"
          element={
            <Protect role="User">
              <Cart />
            </Protect>
          }
        />

        {/* ✅ Added Checkout Route */}
        <Route
          path="/checkout"
          element={
            <Protect role="User">
              <Checkout />
            </Protect>
          }
        />
        <Route path="/orders" element={
  <Protect role="User">
    <Orders />
  </Protect>
} />

<Route path="/admin/orders" element={
  <Protect role="Admin">
    <AdminOrders />
  </Protect>
} />
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