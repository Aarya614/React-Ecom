// import React from "react";

// function Userindex() {
//   let products = [];

//   try {
//     products = JSON.parse(localStorage.getItem("Products")) || [];
//   } catch {
//     products = [];
//   }

//   const handleAddToCart = (product) => {
//     let cart = JSON.parse(localStorage.getItem("Cart")) || [];

//     cart.push(product);
//     localStorage.setItem("Cart", JSON.stringify(cart));

//     alert("Added to cart");
//   };

//   return (
//     <center>
//       <h1>User Products</h1>

//       <div className="card-container">
//         {products.map((p, i) => (
//           <div key={i} className="card">
//             <h3>{p.productname}</h3>
//             <p>₹{p.productprice}</p>
//             <p>Qty: {p.quantity}</p>

//             <button
//               className="btn btn-primary"
//               onClick={() => handleAddToCart(p)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </center>
//   );
// }

// export default Userindex;

// import React from "react";

// function Userindex() {
//   let products = [];

//   try {
//     products = JSON.parse(localStorage.getItem("Products")) || [];
//   } catch {
//     products = [];
//   }

//   const handleAddToCart = (product) => {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//     if (!currentUser) {
//       alert("Please login first");
//       return;
//     }

//     const cartKey = `Cart_${currentUser.email}`;

//     let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

//     cart.push(product);

//     localStorage.setItem(cartKey, JSON.stringify(cart));

//     alert("Added to cart");
//   };

//   return (
//     <center>
//       <h1>User Products</h1>

//       <div className="card-container">
//         {products.length > 0 ? (
//           products.map((p, i) => (
//             <div key={i} className="card">
//               <h3>{p.productname}</h3>
//               <p>₹{p.productprice}</p>
//               <p>Qty: {p.quantity}</p>

//               <button
//                 className="btn btn-primary"
//                 onClick={() => handleAddToCart(p)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No products available</p>
//         )}
//       </div>
//     </center>
//   );
// }

// export default Userindex;
import React from "react";

function Userindex() {
  let products = JSON.parse(localStorage.getItem("Products")) || [];

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const cartKey = `Cart_${user.email}`;

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const index = cart.findIndex(
      (item) => item.productname === product.productname
    );

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));

    alert("Added to cart");
  };

  return (
    <center>
      <h1>Products</h1>

      {products.map((p, i) => (
        <div key={i}>
          <h3>{p.productname}</h3>
          <p>₹{p.productprice}</p>

          <button onClick={() => handleAddToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </center>
  );
}

export default Userindex;