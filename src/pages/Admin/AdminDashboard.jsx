import React from "react";

function AdminDashboard() {
  let loggeduser = null;

  try {
    loggeduser = JSON.parse(localStorage.getItem("loggeduser"));
  } catch {
    loggeduser = null;
  }

  return (
    <div>
      <center>
        <h1>Admin Dashboard</h1>

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
      </center>
    </div>
  );
}

export default AdminDashboard;
