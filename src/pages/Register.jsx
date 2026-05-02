// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [user, setUser] = useState({ ename: "", email: "", pass: "" });
//   const navigate = useNavigate();

//   const handlesubmit = (e) => {
//     e.preventDefault();

//     if (!user.email || !user.pass || !user.ename) {
//       alert("All fields are required");
//       return;
//     }

//     let users = JSON.parse(localStorage.getItem("User")) || [];

//     const exist = users.find((i) => i.email === user.email);

//     if (exist) {
//       alert("Email already registered please login");
//       navigate("/login");
//       return;
//     }

//     users.push(user);
//     localStorage.setItem("User", JSON.stringify(users));

//     alert("Registration Complete");
//     navigate("/login");
//   };

//   const handlechange = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <h1>
//         <center>Register Page</center>
//       </h1>
//       <form style={{ textAlign: "center" }}>
//         <input type="text" name="ename" placeholder="Enter name" onChange={handlechange} required/>
//         <br />
//         <br />
//         <input type="email" name="email" placeholder="Enter email" onChange={handlechange} required />
//         <br />
//         <br />
//         <input type="password" name="pass" placeholder="Enter password" onChange={handlechange} required/>
//         <br />
//         <br />
//         <button type="submit" onClick={handlesubmit}>
//           {" "}
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ ename: "", email: "", pass: "" });
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.pass || !user.ename) {
      alert("All fields required");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find((u) => u.email === user.email);

    if (exist) {
      alert("User already exists");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");
    navigate("/login");
  };

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <center>
      <h1>Register</h1>

      <input name="ename" placeholder="Name" onChange={handlechange} />
      <br /><br />

      <input name="email" placeholder="Email" onChange={handlechange} />
      <br /><br />

      <input name="pass" type="password" placeholder="Password" onChange={handlechange} />
      <br /><br />

      <button onClick={handlesubmit}>Register</button>
    </center>
  );
}