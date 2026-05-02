// import React, { useState } from "react";

// function Cart() {
//   const [cart, setCart] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("Cart")) || [];
//     } catch {
//       return [];
//     }
//   });

//   const handleDelete = (index) => {
//     const updated = cart.filter((_, i) => i !== index);
//     setCart(updated);
//     localStorage.setItem("Cart", JSON.stringify(updated));
//   };

//   const handleBuy = () => {
//     alert("Purchase successful!");
//     localStorage.removeItem("Cart");
//     setCart([]);
//   };

//   return (
//     <center>
//       <h1>Cart</h1>

//       {cart.length > 0 ? (
//         <>
//           <div className="card-container">
//             {cart.map((item, i) => (
//               <div key={i} className="card">
//                 <h3>{item.productname}</h3>
//                 <p>₹{item.productprice}</p>
//                 <p>Qty: {item.quantity}</p>

//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(i)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button className="btn btn-success" onClick={handleBuy}>
//             Buy All
//           </button>
//         </>
//       ) : (
//         <p>Cart is empty</p>
//       )}
//     </center>
//   );
// }

// export default Cart;
import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? `Cart_${user.email}` : null;
  };

  useEffect(() => {
    const key = getCartKey();
    if (!key) return;

    const stored = JSON.parse(localStorage.getItem(key)) || [];
    setCart(stored);
  }, []);

  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.productprice * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  const handleDelete = (index) => {
    const key = getCartKey();
    const updated = cart.filter((_, i) => i !== index);

    setCart(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const handleBuy = () => {
    const key = getCartKey();

    alert("Purchase successful");

    localStorage.removeItem(key);
    setCart([]);
    setTotal(0);
  };

  return (
    <center>
      <h1>Cart</h1>

      {cart.length > 0 ? (
        <>
          {cart.map((item, i) => (
            <div key={i}>
              <h3>{item.productname}</h3>
              <p>{item.quantity} x ₹{item.productprice}</p>

              <button onClick={() => handleDelete(i)}>Remove</button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
          <button onClick={handleBuy}>Buy</button>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </center>
  );
}

export default Cart;