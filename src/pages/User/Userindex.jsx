import { useState } from "react";
import UserNavbar from "./UserNavbar";
import "./Product.css"; 

function Userindex() {
  const [products] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("Products")) || [];
    } catch {
      return [];
    }
  });

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];

    const cartItem = {
      ...product,
      productname: product.productname || "Unknown Product",
      productprice: product.productprice || 0,
      quantity: 1, 
    };

    cart.push(cartItem);
    localStorage.setItem("Cart", JSON.stringify(cart));
    alert("Added to Cart!");
  };

  return (
    <>
      <UserNavbar />

      <div className="container">
        <h2 className="title" style={{ textAlign: "center", margin: "20px 0" }}>
          Shop Our Collection
        </h2>

        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((p, index) => (
              <div className="card" key={index}>
              
                <img 
                  src={p.image || "https://placehold.co/400x300/f8fafc/6b7280?text=No+Image"} 
                  alt={p.productname || "Product Image"} 
                />
                
                {/* ✅ FIX: Mapped to Admin keys (productname, productprice) */}
                <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>
                  {p.productname}
                </h4>
                
                <p className="price">${Number(p.productprice).toFixed(2)}</p>
                
                <button onClick={() => handleAddToCart(p)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "18px" }}>
              No products are currently available. Check back later!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Userindex;