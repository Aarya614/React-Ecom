import React from "react";

export default function Home() {
  let products = [];

  try {
    products = JSON.parse(localStorage.getItem("Products")) || [];
  } catch {
    products = [];
  }

  return (
    <center>
      <h1>Home Page</h1>

      <div className="card-container">
        {products.map((p, i) => (
          <div key={i} className="card">
            <h3>{p.productname}</h3>
            <p>₹{p.productprice}</p>
            <p>Qty: {p.quantity}</p>
          </div>
        ))}
      </div>
    </center>
  );
}