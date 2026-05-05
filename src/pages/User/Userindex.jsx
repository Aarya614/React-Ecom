import React from "react";

function Userindex() {
  let products = [];

  try {
    products = JSON.parse(localStorage.getItem("Products")) || [];
  } catch {
    products = [];
  }

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("loggeduser"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const userKey = `Cart_${user.email}`;

    let cart = JSON.parse(localStorage.getItem(userKey)) || [];

    const item = {
      ...product,
      userEmail: user.email,
    };

    cart.push(item);

    localStorage.setItem(userKey, JSON.stringify(cart));

    alert("Added to cart");
  };

  return (
    <div className="cart-container">
      <h1>User Products</h1>

      <div className="cart-card-container">
        {products.map((p, i) => (
          <div key={i} className="cart-card">
            <h3>{p.productname}</h3>
            <p>₹{p.productprice}</p>
            <p>Qty: {p.quantity}</p>

            <button
              className="cart-btn"
              style={{ background: "#007bff" }}
              onClick={() => handleAddToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userindex;
