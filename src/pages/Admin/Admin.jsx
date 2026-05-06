import { useState } from "react";

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

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("User", JSON.stringify(updatedUsers));
  };

  return (
    <div style={{ padding: "40px 5%", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 className="center-title" style={{ marginTop: 0 }}>Admin Page</h1>

      <div style={{ 
        background: "var(--surface)", 
        padding: "30px", 
        borderRadius: "var(--radius)", 
        boxShadow: "var(--shadow-sm)", 
        marginBottom: "30px" 
      }}>
        <h2 style={{ marginBottom: "20px", color: "var(--text-main)", fontSize: "20px" }}>
          Logged In User
        </h2>
        
        {loggeduser ? (
          <div className="table-responsive" style={{ margin: 0, width: "100%" }}>
            <table>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "600", color: "var(--primary)" }}>
                    {loggeduser.ename || "Admin"}
                  </td>
                  <td>{loggeduser.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>No user logged in</p>
        )}
      </div>

      <div style={{ 
        background: "var(--surface)", 
        padding: "30px", 
        borderRadius: "var(--radius)", 
        boxShadow: "var(--shadow-sm)" 
      }}>
        <h2 style={{ marginBottom: "20px", color: "var(--text-main)", fontSize: "20px" }}>
          All Registered Users
        </h2>

        {users.length > 0 ? (
          <div className="table-responsive" style={{ margin: 0, width: "100%" }}>
            <table>
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
                    <td style={{ fontWeight: "600" }}>{u.ename}</td>
                    <td>{u.email}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(index)}
                        style={{ background: "#ef4444", padding: "8px 16px", fontSize: "14px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>No users found</p>
        )}
      </div>
    </div>
  );
}

export default Admin;