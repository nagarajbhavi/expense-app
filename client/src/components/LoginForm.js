import { useState } from "react";
import axios from "axios";

import { isEmpty } from "lodash";
import "./Login.css";

export default function LoginForm({ loginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};
  const [serverErrors, setServerErrors] = useState(""); // because "err.response.data.notice" is sting

  const validateErrors = () => {
    if (email.trim().length === 0) {
      errors.email = "Email is Required";
    }
    if (password.trim().length === 0) {
      errors.password = "Password is Required";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    validateErrors();

    if (isEmpty(errors)) {
      try {
        const response = await axios.post(
          "http://localhost:3050/api/users/login",
          formData
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("Successfully logged In");
        loginSuccess();
        setFormErrors({});
      } catch (err) {
        console.log(err);
        setServerErrors(err.response.data.notice);
        // setServerErrors(err) throw an err because "err" is an object, we set stateVariable as empty string
      }
    } else {
      setFormErrors(errors);
    }
    //   axios
    //     .post("http://localhost:3050/api/users/login", formData)
    //     .then((response) => {
    //       // console.log(response.data);
    //       const token = response.data.token;
    //       localStorage.setItem("token", token); // value should be a String
    //       alert("Successfully logged In");
    //       loginSuccess(); // make login as true in the parent component
    //       setFormErrors({});
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setServerErrors(err.response.data.notice);
    //       // setServerErrors(err) throw an err because "err" is an object, we set stateVariable as empty string
    //     });
    // } else {
    //   setFormErrors(errors);
    // }
  };
  return (
    <div id="login-container">
      <div>
        <h2>Login</h2>
        {serverErrors && <p style={{ color: "red" }}>{serverErrors}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors && (
            <span style={{ color: "red" }}>{formErrors.email}</span>
          )}
          {/* <label htmlFor="password">Enter Password</label> */}
          <input
            type="password"
            value={password}
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors && (
            <span style={{ color: "red" }}>{formErrors.password}</span>
          )}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";

// import { isEmpty } from "lodash";

// export default function LoginForm({ loginSuccess }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formErrors, setFormErrors] = useState({});
//   const errors = {};
//   const [serverErrors, setServerErrors] = useState(""); // because "err.response.data.notice" is sting

//   const validateErrors = () => {
//     if (email.trim().length === 0) {
//       errors.email = "Email is Required";
//     }
//     if (password.trim().length === 0) {
//       errors.password = "Password is Required";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       email,
//       password,
//     };
//     validateErrors();

//     if (isEmpty(errors)) {
//       try {
//         const response = await axios.post(
//           "http://localhost:3050/api/users/login",
//           formData
//         );
//         const token = response.data.token;
//         localStorage.setItem("token", token);
//         alert("Successfully logged In");
//         loginSuccess();
//         setFormErrors({});
//       } catch (err) {
//         console.log(err);
//         setServerErrors(err.response.data.notice);
//         // setServerErrors(err) throw an err because "err" is an object, we set stateVariable as empty string
//       }
//     } else {
//       setFormErrors(errors);
//     }
//     //   axios
//     //     .post("http://localhost:3050/api/users/login", formData)
//     //     .then((response) => {
//     //       // console.log(response.data);
//     //       const token = response.data.token;
//     //       localStorage.setItem("token", token); // value should be a String
//     //       alert("Successfully logged In");
//     //       loginSuccess(); // make login as true in the parent component
//     //       setFormErrors({});
//     //     })
//     //     .catch((err) => {
//     //       console.log(err);
//     //       setServerErrors(err.response.data.notice);
//     //       // setServerErrors(err) throw an err because "err" is an object, we set stateVariable as empty string
//     //     });
//     // } else {
//     //   setFormErrors(errors);
//     // }
//   };
//   return (
//     <div>
//       <h2> Login</h2>
//       {serverErrors && <p style={{ color: "red" }}>{serverErrors}</p>}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="email">Enter Email</label>
//         <br />
//         <input
//           type="text"
//           value={email}
//           id="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {formErrors && <span style={{ color: "red" }}>{formErrors.email}</span>}
//         <br />
//         <label htmlFor="password">Enter Password</label>
//         <br />
//         <input
//           type="password"
//           value={password}
//           id="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {formErrors && (
//           <span style={{ color: "red" }}>{formErrors.password}</span>
//         )}
//         <br />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
