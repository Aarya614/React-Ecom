import React, { useEffect, useState } from "react";
import "../User/Orders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("All_Orders")) || [];
    setOrders(data);
  }, []);

  return (
    <div className="orders-container">
      <h2>All User Orders</h2>

      {orders.length > 0 ? (
        orders.map((item, i) => (
          <div key={i} className="order-card">
            <div className="order-left">
              <h3>{item.productname}</h3>
              <p>₹{item.productprice}</p>
              <p>Qty: {item.quantity || 1}</p>
            </div>

            <div className="order-right">
              <p><b>User:</b> {item.userEmail}</p>
              <p><b>ID:</b> {item.orderId}</p>
              <p>{item.date}</p>
              <p className="status">{item.status}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="center">No orders found</p>
      )}
    </div>
  );
}

export default AdminOrders;