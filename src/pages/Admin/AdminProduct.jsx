import React, { useState } from "react";

function AdminProduct() {
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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    if (!product.productname || !product.productprice || !product.quantity) {
      alert("All fields required");
      return;
    }

    const updated = [...products, product];
    setProducts(updated);
    localStorage.setItem("Products", JSON.stringify(updated));

    setProduct({ productname: "", productprice: "", quantity: "" });
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete product?")) return;

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

  return (
    <div>
      <center>
        <h1>Products</h1>

        <input
          type="text"
          name="productname"
          placeholder="Product name"
          value={product.productname}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="number"
          name="productprice"
          placeholder="Price"
          value={product.productprice}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <br />
        <br />
        <button onClick={handleAdd}>Add Product</button>
        <br />
        <br />
        {products.length > 0 ? (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.productname}</td>
                  <td>{p.productprice}</td>
                  <td>
                    <input
                      type="number"
                      value={p.quantity}
                      onChange={(e) => handleQuantityChange(i, e.target.value)}
                      style={{ width: "60px" }}
                    />
                  </td>

                  <td>
                    <button onClick={() => handleDelete(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products</p>
        )}
      </center>
    </div>
  );
}

export default AdminProduct;
