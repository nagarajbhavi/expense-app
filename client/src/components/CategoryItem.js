import axios from "axios";
import { url } from "./Config";

export default function CategoryItem({ item, handleUpdate, handleRemove }) {
  const handleEdit = async (obj) => {
    const input = prompt("Update the Category", obj.name);
    const formData = {
      name: input[0].toUpperCase() + input.substring(1),
    };

    try {
      const response = await axios.put(
        `${url}/api/categories/${obj._id}`,
        formData,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      // console.log(response.data);
      handleUpdate(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (obj) => {
    const userConfirm = window.confirm(`Aye you sure to delete ${obj.name} ??`);
    if (userConfirm) {
      try {
        const response = await axios.delete(
          `${url}/api/categories/${obj._id}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        //   console.log(response.data);
        handleRemove(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <li>
      {item.name}
      <button
        onClick={() => {
          handleEdit(item);
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          handleDelete(item);
        }}
      >
        Delete
      </button>
    </li>
  );
}

// import axios from "axios";
// import { url } from "./Config";

// export default function CategoryItem({ item, handleUpdate, handleRemove }) {
//   const handleEdit = async (obj) => {
//     const input = prompt("Update the Category", obj.name);
//     const formData = {
//       name: input,
//     };

//     try {
//       const response = await axios.put(
//         `${url}/api/categories/${obj._id}`,
//         formData,
//         {
//           headers: { Authorization: localStorage.getItem("token") },
//         }
//       );
//       // console.log(response.data);
//       handleUpdate(response.data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const handleDelete = async (obj) => {
//     const userConfirm = window.confirm(`Aye you sure to delete ${obj.name} ??`);
//     if (userConfirm) {
//       try {
//         const response = await axios.delete(
//           `${url}/api/categories/${obj._id}`,
//           {
//             headers: { Authorization: localStorage.getItem("token") },
//           }
//         );
//         //   console.log(response.data);
//         handleRemove(response.data);
//       } catch (err) {
//         console.log(err.message);
//       }
//     }
//   };

//   return (
//     <li>
//       {item.name}
//       <button
//         onClick={() => {
//           handleEdit(item);
//         }}
//       >
//         Edit
//       </button>
//       <button
//         onClick={() => {
//           handleDelete(item);
//         }}
//       >
//         Delete
//       </button>
//     </li>
//   );
// }
