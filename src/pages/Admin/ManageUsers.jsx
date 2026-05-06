import { useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("User")) || [];
    } catch {
      return [];
    }
  });

  const handleDelete = (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;


    const updatedUsers = users.filter((u) => u.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem("User", JSON.stringify(updatedUsers));
    

    localStorage.removeItem(`Cart_${email}`);
    localStorage.removeItem(`Orders_${email}`);
  };

  return (
    <div style={{ padding: "40px 5%", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Manage Registered Users</h2>

      {users.length > 0 ? (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: "600" }}>{u.ename}</td>
                  <td>{u.email}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(u.email)}
                      style={{ background: "#ef4444", padding: "8px 16px", fontSize: "14px" }}
                    >
                      Remove User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ color: "var(--text-muted)" }}>No users found.</p>
      )}
    </div>
  );
}

export default ManageUsers;