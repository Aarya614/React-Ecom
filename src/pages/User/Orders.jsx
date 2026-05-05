import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    user = null;
  }

  const userOrdersKey = user ? `Orders_${user.email}` : null;

  useEffect(() => {
    if (!userOrdersKey) return;

    const data =
      JSON.parse(localStorage.getItem(userOrdersKey)) || [];

    setOrders(data);
  }, [userOrdersKey]);

  if (!user) return <h2 className="center">Please login</h2>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length > 0 ? (
        orders.map((item, i) => (
          <div key={i} className="order-card">
            <div className="order-left">
              <h3>{item.productname}</h3>
              <p>₹{item.productprice}</p>
              <p>Qty: {item.quantity || 1}</p>
            </div>

            <div className="order-right">
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

export default Orders;