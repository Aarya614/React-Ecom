import React, { useState } from "react";

function ManageUsers() {
  let storedUsers = [];

  try {
    storedUsers = JSON.parse(localStorage.getItem("User")) || [];
  } catch {
    storedUsers = [];
  }

  const [users, setUsers] = useState(storedUsers);

  const handleDelete = (index) => {
    if (!window.confirm("Delete user?")) return;

    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    localStorage.setItem("User", JSON.stringify(updated));
  };

  return (
    <div>
      <center>
        <h1>Manage Users</h1>

        {users.length > 0 ? (
          <table border="1" cellPadding="10">
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{u.ename}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => handleDelete(i)}>Delete</button>
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

export default ManageUsers;
