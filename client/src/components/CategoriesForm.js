import { useState } from "react";
import axios from "axios";
import { url } from "./Config";
export default function CategoriesForm({ handleAdd }) {
  const [name, setName] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const validateErrors = () => {
    if (name.trim().length === 0) {
      errors.name = "Name is required";
    }
  };

  const handleSubmit = async (e) => {
    const _name = name.trim();
    e.preventDefault();
    const formData = {
      name: _name[0].toUpperCase() + _name.substring(1),
    };

    validateErrors();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(` ${url}/api/categories`, formData, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        // console.log(response.data);
        handleAdd(response.data);
        setFormErrors({});
        setName("");
      } catch (err) {
        console.log(err.response.data.errors);
      }
    } else {
      // console.log(errors);
      setFormErrors(errors);
    }
  };

  // axios
  //   .post(` ${url}/api/categories`, formData, {
  //     headers: { Authorization: localStorage.getItem("token") },
  //   })
  //   .then((response) => {
  //     // console.log(response.data);
  //     handleAdd(response.data);
  //     setFormErrors({});
  //     setName("");
  //   })
  //   .catch((err) => {
  //     console.log(err.response.data.errors);
  //   });

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {formErrors.name && (
          <span style={{ color: "red" }}>Name is required</span>
        )}
        <input type="submit" />
      </form>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import { url } from "./Config";
// export default function CategoriesForm({ handleAdd }) {
//   const [name, setName] = useState("");

//   const [formErrors, setFormErrors] = useState({});
//   const errors = {};

//   const validateErrors = () => {
//     if (name.trim().length === 0) {
//       errors.name = "Name is required";
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       name: name,
//     };

//     validateErrors();

//     if (Object.keys(errors).length === 0) {
//       try {
//         const response = await axios.post(` ${url}/api/categories`, formData, {
//           headers: { Authorization: localStorage.getItem("token") },
//         });
//         // console.log(response.data);
//         handleAdd(response.data);
//         setFormErrors({});
//         setName("");
//       } catch (err) {
//         console.log(err.response.data.errors);
//       }
//     } else {
//       // console.log(errors);
//       setFormErrors(errors);
//     }
//   };

//   // axios
//   //   .post(` ${url}/api/categories`, formData, {
//   //     headers: { Authorization: localStorage.getItem("token") },
//   //   })
//   //   .then((response) => {
//   //     // console.log(response.data);
//   //     handleAdd(response.data);
//   //     setFormErrors({});
//   //     setName("");
//   //   })
//   //   .catch((err) => {
//   //     console.log(err.response.data.errors);
//   //   });

//   return (
//     <div>
//       <h3>Add Category</h3>
//       <form onSubmit={handleSubmit}>
//         <label>Enter Category</label>
//         <br />
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         {formErrors.name && (
//           <span style={{ color: "red" }}>Name is required</span>
//         )}{" "}
//         <br />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
