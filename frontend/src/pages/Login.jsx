// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/user/login",
//         data,
//         { withCredentials: true }
//       );
//       console.log("Login success", response.data);
//       alert("Logged in successfully");

//       navigate("/");
//     } catch (error) {
//       console.log("Login error", error);
//       alert("Invalid email or password");
//     }
//   }

//   return (
//     <div className="login-box">
//       <h1>Login to your account</h1>

//       <form onSubmit={handleSubmit}>
//         <label>Email</label>
//         <input
//           type="text"
//           placeholder="Enter your Email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter password"
//           name="password"
//           value={data.password}
//           onChange={handleChange}
//         />

//         <button type="submit">Submit</button>
//       </form>

//       <p className="register-link">
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// }

// export default Login;

// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import "../App.css"
// import { useAuth } from '../contexts/AuthProvider'

// function Login() {
//   const { isLoggedIn, setIsLoggedIn } = useAuth();
//   const navigate = useNavigate()
//   const { checkIsLoggedIn } = useAuth()

//   const [data, setData] = useState({
//     email: "",
//     password: ""
//   })

//   function handleChange(e) {
//     const { name, value } = e.target
//     setData({ ...data, [name]: value })

//   }

// async function handleSubmit(e) {
//   e.preventDefault();

//   try {
//     const response = await axios.post(
//       "http://localhost:3000/user/login",
//       data,
//       { withCredentials: true }
//     );

//     console.log("Login success", response.data);

//     // Check login state
//     checkIsLoggedIn();

//     // Handle redirection based on query parameters
//     const params = new URLSearchParams(window.location.search);
//     if (params.size > 0) {
//       for (const [key, value] of params.entries()) {
//         if (key === "nextPage") {
//           navigate(value);
//           return;
//         }
//       }
//     }

//     // Default redirect if no query parameter
//     navigate("/");
//   } catch (error) {
//     console.log("Login error", error);
//     alert("Invalid email or password");
//   }
// }

//   return (
//     <div>
//       <h2>Login To your Account</h2>
//       <form action="" onSubmit={handleSubmit}>
//         <div className='form-group'>
//           <label htmlFor="email">email</label>
//           <input type="text" placeholder='Enter Your Email' name='email' value={data.email} onChange={handleChange} required />
//         </div>

//         <div className='form-group'>
//           <label htmlFor="password">password</label>
//           <input type="password" placeholder='Enter Your Password' name='password' value={data.password} onChange={handleChange} required />
//         </div>

//         <button type='submit'>login</button> <br />
//         <span id='reg' > register if you not have account <Link to="/register"> <span>register</span>  </Link></span>
//       </form>

//     </div>
//   )
// }

// export default Login

import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Login() {
  const { checkIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/user/login", data, {
        withCredentials: true,
      });
      checkIsLoggedIn();

      // ✅ go back to product page
      navigate(location.state?.from || "/");
    } catch (error) {
      alert("Invalid email or password");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
