import AdminNavbar from "./AdminNavbar";

function AdminDashboard() {
  let loggeduser = null;

  try {
    loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    // ✅ FIX: Removed the redundant "loggeduser = null;" assignment. 
    // It stays null if the parsing fails!
  }

  return (
    <>
      <AdminNavbar />
      
      <div style={{ padding: "40px 5%", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 className="center-title" style={{ marginTop: 0 }}>Admin Dashboard</h2>

        <div style={{ 
          background: "var(--surface)", 
          padding: "30px", 
          borderRadius: "var(--radius)", 
          boxShadow: "var(--shadow-sm)", 
          marginTop: "30px" 
        }}>
          <h3 style={{ marginBottom: "20px", color: "var(--text-main)" }}>Active Session</h3>

          {loggeduser ? (
            <div className="table-responsive" style={{ margin: 0, width: "100%" }}>
              <table>
                <thead>
                  <tr>
                    <th>Role / Name</th>
                    <th>Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "600", color: "var(--primary)" }}>
                      {loggeduser.ename || "Administrator"}
                    </td>
                    <td>{loggeduser.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)" }}>No admin is currently logged in.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;