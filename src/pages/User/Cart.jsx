import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("Cart")) || [];
    } catch {
      return [];
    }
  });

  const total = cart.reduce(
    (acc, item) => acc + Number(item.productprice || 0), 
    0
  );

  const handleDelete = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("Cart", JSON.stringify(updated));
  };

  return (
    <>

      <UserNavbar />

      <div className="cart-container">
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div className="cart-card" key={index}>
                <img src={item.image} alt={item.productname} />
                
                <div className="cart-info">
                  <h3>{item.productname}</h3>
                  <p>${Number(item.productprice).toFixed(2)}</p>
                  
                  <button onClick={() => handleDelete(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>
              Your cart is empty.
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-summary">
            <h2>Total: ${total.toFixed(2)}</h2>
            
            <button 
              className="order-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;