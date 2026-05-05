import React, { useState } from "react";

function Admin() {
  const [loggeduser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loggeduser"));
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("User")) || [];
    } catch {
      return [];
    }
  });

  // DELETE USER
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("User", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <center>
        <h1>Admin Page</h1>

        <h2>Logged In User</h2>
        {loggeduser ? (
          <table border="1" cellPadding="10">
            <tbody>
              <tr>
                <td>{loggeduser.ename || "Admin"}</td>
                <td>{loggeduser.email}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No user logged in</p>
        )}

        <br />

        <h2>All Registered Users</h2>
        {users.length > 0 ? (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{u.ename}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found</p>
        )}
      </center>
    </div>
  );
}

export default Admin;
