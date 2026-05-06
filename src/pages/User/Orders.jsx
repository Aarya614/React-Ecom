import { useState } from "react";
import UserNavbar from "./UserNavbar";
import "./Orders.css";

function Orders() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    // Fails safely if local storage is corrupted
  }

  const userOrdersKey = user ? `Orders_${user.email}` : null;

  
  const [orders] = useState(() => {
    if (!userOrdersKey) return [];
    try {
      return JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    } catch {
      return [];
    }
  });

  if (!user) {
    return (
      <>
        <UserNavbar />
        <h2 className="center-title">Please login to view your orders.</h2>
      </>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className="orders-container">
        <h2>My Orders</h2>

        {orders.length > 0 ? (
          orders.map((item, i) => (
            <div key={i} className="order-card">
              <div className="order-left">
                <h3>{item.productname}</h3>
                <p style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "18px" }}>
                  ${item.productprice}
                </p>
                <p>Qty: {item.quantity || 1}</p>
              </div>

              <div className="order-right">
                <p><b>ID:</b> {item.orderId}</p>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px" }}>
                  {item.date}
                </p>
                <p className="status">{item.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
            You haven't placed any orders yet.
          </p>
        )}
      </div>
    </>
  );
}

export default Orders;