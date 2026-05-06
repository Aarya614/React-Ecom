import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

function AdminProduct() {
  // 1. State for local products (editable)
  const [product, setProduct] = useState({
    productname: "",
    productprice: "",
    quantity: "",
  });

  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("Products")) || [];
    } catch {
      return [];
    }
  });

  // 2. State for API products (read-only)
  const [apiProducts, setApiProducts] = useState([]);

  // Fetch API products on load
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Format API products so they match our table structure
        const formattedApi = data.map((item) => ({
          productname: item.title,
          productprice: item.price,
          quantity: "Unlimited (API)",
          isApi: true, // Flag to prevent deleting global API items
        }));
        setApiProducts(formattedApi);
      })
      .catch((err) => console.error("Failed to load API products", err));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault(); 
    if (!product.productname || !product.productprice || !product.quantity) {
      alert("All fields are required");
      return;
    }

    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem("Products", JSON.stringify(updated));
    setProduct({ productname: "", productprice: "", quantity: "" });
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this local product?")) return;
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("Products", JSON.stringify(updated));
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...products];
    updated[index].quantity = value;
    setProducts(updated);
    localStorage.setItem("Products", JSON.stringify(updated));
  };

  // Combine both arrays so the Admin sees everything available in the store
  const allProducts = [...products, ...apiProducts];

  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "40px 5%", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 className="center-title" style={{ marginTop: 0 }}>Manage Inventory</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "30px" }}>
          
          {/* Add Product Form */}
          <div style={{ flex: "1 1 300px" }}>
            <form onSubmit={handleAdd} style={{ margin: 0, width: "100%", maxWidth: "100%" }}>
              <h3>Add Local Product</h3>
              <input
                type="text"
                name="productname"
                placeholder="Product Name"
                value={product.productname}
                onChange={handleChange}
              />
              <input
                type="number"
                name="productprice"
                placeholder="Price ($)"
                value={product.productprice}
                onChange={handleChange}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Stock Quantity"
                value={product.quantity}
                onChange={handleChange}
              />
              <button type="submit" style={{ width: "100%" }}>Add Product</button>
            </form>
          </div>

          {/* Product List Table */}
          <div style={{ flex: "2 1 600px" }}>
            {allProducts.length > 0 ? (
              <div className="table-responsive" style={{ margin: 0, width: "100%" }}>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Stock Qty</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((p, i) => {
                      const isLocal = !p.isApi;
                      return (
                        <tr key={i} style={{ backgroundColor: p.isApi ? "#f8fafc" : "white" }}>
                          <td>{i + 1}</td>
                          <td style={{ fontWeight: "600" }}>
                            <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "250px" }}>
                              {p.productname}
                            </div>
                            {p.isApi && <span style={{ fontSize: "11px", color: "var(--primary)" }}>From FakeStore API</span>}
                          </td>
                          <td style={{ color: "var(--primary)", fontWeight: "bold" }}>${Number(p.productprice).toFixed(2)}</td>
                          <td>
                            {isLocal ? (
                              <input
                                type="number"
                                value={p.quantity}
                                onChange={(e) => handleQuantityChange(i, e.target.value)}
                                style={{ width: "80px", padding: "8px" }}
                              />
                            ) : (
                              <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>{p.quantity}</span>
                            )}
                          </td>
                          <td>
                            {isLocal ? (
                              <button 
                                onClick={() => handleDelete(i)}
                                style={{ background: "#ef4444", padding: "8px 15px", fontSize: "14px" }}
                              >
                                Delete
                              </button>
                            ) : (
                              <span style={{ color: "#94a3b8", fontSize: "13px" }}>Read Only</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ background: "var(--surface)", padding: "30px", borderRadius: "var(--radius)", textAlign: "center" }}>
                <p style={{ color: "var(--text-muted)" }}>Loading products...</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminProduct;