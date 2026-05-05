// import { useEffect, useState } from 'react'

// function Checkout() {
//     const [cartitem, setCartitems] = useState([])

//     const user = JSON.parse(localStorage.getItem('loggeduser'))

//     useEffect(() => {
//         const storedproducts =
//             JSON.parse(localStorage.getItem('Cart')) || []

//         setCartitems(storedproducts)
//     }, [])

//     if (!user) {
//         return <p style={{ textAlign: 'center' }}>Please login first</p>
//     }

//     const mycart = cartitem.filter(
//         item => item.user === user.email
//     )

//     const total = mycart.reduce((sum, item) => {
//         return sum + Number(item.price) * (item.quantity || 1)
//     }, 0)

//     const handlePayment = () => {
//         let allcart =
//             JSON.parse(localStorage.getItem('Cart')) || []

//         const balancecart = allcart.filter(
//             item => item.user !== user.email
//         )

//         localStorage.setItem(
//             'Cart',
//             JSON.stringify(balancecart)
//         )

//         alert('Payment successful ✅')

//         setCartitems([])
//     }

//     return (
//         <div style={{
//             minHeight: '100vh',
//             backgroundColor: '#f4f6f8',
//             padding: '30px',
//             fontFamily: 'Arial'
//         }}>
//             <h2 style={{
//                 textAlign: 'center',
//                 color: '#2c3e50',
//                 marginBottom: '20px'
//             }}>
//                 Checkout
//             </h2>

//             {mycart.length === 0 ? (
//                 <p style={{
//                     textAlign: 'center',
//                     color: '#888'
//                 }}>
//                     No product found
//                 </p>
//             ) : (
//                 mycart.map((item, index) => (
//                     <div key={index} style={{
//                         backgroundColor: '#fff',
//                         padding: '15px',
//                         margin: '10px auto',
//                         width: '60%',
//                         borderRadius: '10px',
//                         boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                     }}>
//                         <h3 style={{ margin: 0 }}>
//                             {item.name}
//                         </h3>

//                         <p style={{
//                             color: '#27ae60',
//                             fontWeight: 'bold'
//                         }}>
//                             Price: ₹{item.price}
//                         </p>

//                         <p style={{
//                             color: '#555'
//                         }}>
//                             Qty: {item.quantity || 1}
//                         </p>
//                     </div>
//                 ))
//             )}

//             <h3 style={{
//                 textAlign: 'center',
//                 marginTop: '20px',
//                 color: '#2c3e50'
//             }}>
//                 Total: ₹{total.toFixed(2)}
//             </h3>

//             {mycart.length > 0 && (
//                 <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                     <button
//                         onClick={handlePayment}
//                         style={{
//                             padding: '12px 25px',
//                             backgroundColor: '#3498db',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '8px',
//                             fontSize: '16px',
//                             cursor: 'pointer',
//                             transition: '0.3s'
//                         }}
//                         onMouseOver={e => e.target.style.backgroundColor = '#2980b9'}
//                         onMouseOut={e => e.target.style.backgroundColor = '#3498db'}
//                     >
//                         Pay Now
//                     </button>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Checkout
import { useEffect, useState } from "react";

function Checkout() {
  const [cartitem, setCartitems] = useState([]);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    user = null;
  }

  const cartKey = user ? `Cart_${user.email}` : null;

  useEffect(() => {
    if (!cartKey) return;

    const data =
      JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartitems(data);
  }, [cartKey]);

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please login</h2>;
  }

  const total = cartitem.reduce(
    (sum, item) =>
      sum + Number(item.productprice) * (item.quantity || 1),
    0
  );

  const handlePayment = () => {
    const userOrdersKey = `Orders_${user.email}`;
    const allOrdersKey = "All_Orders";

    const existingUserOrders =
      JSON.parse(localStorage.getItem(userOrdersKey)) || [];

    const existingAllOrders =
      JSON.parse(localStorage.getItem(allOrdersKey)) || [];

    const newOrders = cartitem.map((item) => ({
      ...item,
      userEmail: user.email,
      orderId: "ORD" + Math.floor(Math.random() * 100000),
      date: new Date().toLocaleString(),
      status: "Order Placed"
    }));

    localStorage.setItem(
      userOrdersKey,
      JSON.stringify([...existingUserOrders, ...newOrders])
    );

    localStorage.setItem(
      allOrdersKey,
      JSON.stringify([...existingAllOrders, ...newOrders])
    );

    localStorage.removeItem(cartKey);

    alert("Order placed successfully ✅");
    setCartitems([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      {cartitem.map((item, i) => (
        <div key={i}>
          <h3>{item.productname}</h3>
          <p>₹{item.productprice}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;