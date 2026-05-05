import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    user = null;
  }

  const userKey = user ? `Cart_${user.email}` : null;
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    if (!userKey) return [];

    try {
      return JSON.parse(localStorage.getItem(userKey)) || [];
    } catch {
      return [];
    }
  });

  const handleDelete = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);

    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(updated));
    }
  };

  if (!user) {
    return (
      <div className="cart-container">
        <h2>Please login to view cart</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Cart</h1>

      {cart.length > 0 ? (
        <>
          <div className="cart-card-container">
            {cart.map((item, i) => (
              <div key={i} className="cart-card">
                <h3>{item.productname}</h3>
                <p>₹{item.productprice}</p>
                <p>Qty: {item.quantity}</p>

                <button
                  className="cart-btn cart-btn-danger"
                  onClick={() => handleDelete(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            className="cart-btn cart-btn-success btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;