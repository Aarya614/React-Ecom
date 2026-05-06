import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./User/UserNavbar"; 
import "./User/Product.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleAddToCart = (product) => {
    const role = localStorage.getItem("Role");
    
   
    if (role !== "User") {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("Cart")) || [];
    
    const cartItem = {
      ...product,
      productname: product.title,
      productprice: product.price,
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
          Top Deals
        </h2>

        {loading ? (
          <h3 style={{ textAlign: "center", color: "var(--text-muted)" }}>
            Loading products...
          </h3>
        ) : (
          <div className="product-grid">
            {products.map((item) => (
              <div className="card" key={item.id}>
                <img src={item.image} alt={item.title} />
                <h4 style={{ fontSize: "15px", height: "40px", overflow: "hidden" }}>
                  {item.title}
                </h4>
                <p className="price">₹{item.price.toFixed(2)}</p>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;