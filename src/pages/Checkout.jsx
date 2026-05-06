import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const cartKey = "Cart"; 

  const [cartitem] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    user = null;
  }

  if (!user) {
    return <h2 className="center-title">Please login to checkout</h2>;
  }

  const total = cartitem.reduce(
    (sum, item) => sum + Number(item.productprice) * (item.quantity || 1),
    0
  );

  const handlePayment = () => {
    const userOrdersKey = `Orders_${user.email}`;
    const allOrdersKey = "All_Orders";

    const existingUserOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
    const existingAllOrders = JSON.parse(localStorage.getItem(allOrdersKey)) || [];

    const newOrders = cartitem.map((item) => ({
      ...item,
      userEmail: user.email,
      orderId: "ORD-" + Math.floor(Math.random() * 900000 + 100000), 
      date: new Date().toLocaleString(),
      status: "Processing" 
    }));

    localStorage.setItem(userOrdersKey, JSON.stringify([...existingUserOrders, ...newOrders]));
    localStorage.setItem(allOrdersKey, JSON.stringify([...existingAllOrders, ...newOrders]));

    localStorage.removeItem(cartKey);

    alert("Order placed successfully! 🎉");
    navigate("/orders"); 
  };

  return (
    <div style={{ padding: "40px 5%", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Checkout Summary</h2>
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", marginTop: "20px", boxShadow: "var(--shadow-sm)" }}>
        
        {cartitem.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartitem.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "15px 0" }}>
              <span style={{ fontWeight: "600" }}>{item.productname}</span>
              <span style={{ color: "var(--primary)" }}>${item.productprice}</span>
            </div>
          ))
        )}

        <h3 style={{ marginTop: "20px", textAlign: "right" }}>Total: ${total.toFixed(2)}</h3>

        {cartitem.length > 0 && (
          <button onClick={handlePayment} style={{ width: "100%", marginTop: "20px", padding: "15px" }}>
            Confirm & Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

export default Checkout;