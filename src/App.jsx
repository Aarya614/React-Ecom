import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Userindex from "./pages/User/Userindex";
import Cart from "./pages/User/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/User/Orders";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminOrders from "./pages/Admin/AdminOrders";

import Protect from "./pages/Protect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

    
        <Route path="/user" element={<Protect role="User"><Userindex /></Protect>} />
        <Route path="/cart" element={<Protect role="User"><Cart /></Protect>} />
        <Route path="/checkout" element={<Protect role="User"><Checkout /></Protect>} />
        <Route path="/orders" element={<Protect role="User"><Orders /></Protect>} />

        
        <Route path="/admin/dashboard" element={<Protect role="Admin"><AdminDashboard /></Protect>} />
        <Route path="/admin/users" element={<Protect role="Admin"><ManageUsers /></Protect>} />
        <Route path="/admin/products" element={<Protect role="Admin"><AdminProduct /></Protect>} />
        <Route path="/admin/orders" element={<Protect role="Admin"><AdminOrders /></Protect>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;