import { useState } from "react";
import "../User/Orders.css";
import AdminNavbar from "./AdminNavbar";

function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("All_Orders")) || [];
    } catch {
      return [];
    }
  });

  const markAsShipped = (orderId, userEmail) => {
    // 1. Update the master All_Orders list for the Admin
    const updatedAdminOrders = orders.map((order) => {
      if (order.orderId === orderId) {
        return { ...order, status: "Shipped 🚚" };
      }
      return order;
    });

    setOrders(updatedAdminOrders);
    localStorage.setItem("All_Orders", JSON.stringify(updatedAdminOrders));
    const userOrdersKey = `Orders_${userEmail}`;
    const userOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    
    const updatedUserOrders = userOrders.map((order) => {
      if (order.orderId === orderId) {
        return { ...order, status: "Shipped 🚚" };
      }
      return order;
    });

    localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders));
  };

  return (
    <>
      <AdminNavbar />
      
      <div className="orders-container">
        <h2>Global Order Management</h2>

        {orders.length > 0 ? (
          orders.map((item, i) => (
            <div key={i} className="order-card">
              <div className="order-left">
                <h3>{item.productname}</h3>
                <p style={{ color: "var(--primary)", fontWeight: "bold" }}>${item.productprice}</p>
                <p>Customer: <b>{item.userEmail}</b></p>
              </div>

              <div className="order-right">
                <p><b>Order ID:</b> {item.orderId}</p>
                <p>{item.date}</p>
                <p className="status">{item.status}</p>

                {item.status === "Processing" && (
                  <button 
                    onClick={() => markAsShipped(item.orderId, item.userEmail)}
                    style={{ marginTop: "10px", padding: "8px 15px", fontSize: "14px" }}
                  >
                    Mark as Shipped
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "var(--text-muted)" }}>No orders placed yet.</p>
        )}
      </div>
    </>
  );
}

export default AdminOrders;