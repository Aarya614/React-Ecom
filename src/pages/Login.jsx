// import React, { useState } from "react";

// export default function Login() {
//   const [user, setUser] = useState({ email: "", pass: "" });

//   const handlesubmit = (e) => {
//     e.preventDefault();

//     const adminmail = "admin@gmail.com";
//     const adminpass = "admin";

//     if (!user.email || !user.pass) {
//       alert("All fields are required");
//       return;
//     }

//     // ✅ ADMIN LOGIN
//     if (user.email === adminmail && user.pass === adminpass) {
//       localStorage.setItem("Role", "Admin");
//       localStorage.setItem("loggeduser", JSON.stringify(user));

//       alert("Admin Login successful");

//       // 🔥 Force reload so UI updates correctly
//       window.location.href = "/admin/dashboard";
//       return;
//     }

//     // ✅ NORMAL USER LOGIN
//     let users = JSON.parse(localStorage.getItem("User")) || [];

//     const exist = users.find(
//       (i) => i.email === user.email && i.pass === user.pass
//     );

//     if (!exist) {
//       alert("Invalid email or password");
//       return;
//     }

//     localStorage.setItem("Role", "User");
//     localStorage.setItem("loggeduser", JSON.stringify(exist));

//     alert("Login successful");

//     // 🔥 Same fix for user
//     window.location.href = "/user";
//   };

//   const handlechange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h1>
//         <center>Login Page</center>
//       </h1>

//       <form style={{ textAlign: "center" }} onSubmit={handlesubmit}>
//         <input
//           type="email"
//           name="email"
//           onChange={handlechange}
//           required
//         />
//         <br />
//         <br />

//         <input
//           type="password"
//           name="pass"
//           onChange={handlechange}
//           required
//         />
//         <br />
//         <br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.pass === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login successful");
      navigate("/user");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <center>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </center>
  );
}

export default Login;