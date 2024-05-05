import axios from "axios";
import { url } from "./Config";

export default function ExpenseItem({
  item,
  categories,
  removeExpense,
  updateExpense,
}) {
  const categoryName = (id) => {
    const category = categories.find((ele) => ele._id === id);
    // return category.name; // we cant directly do like this it shows error
    // if i do not use if else condition then..
    //  if the category is not found then it returns undefined.. so undefined.name throws an error
    if (category) {
      return category.name;
    } else {
      return "N/A (not available)";
    }
  };

  const handleRemove = async (item) => {
    const userConfirm = window.confirm("Are you sure??");
    if (userConfirm) {
      try {
        const response = await axios.delete(`${url}/api/expenses/${item._id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        // console.log(response.data);
        removeExpense(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleEdit = async (item) => {
    const input = prompt(`Enter Description to edit`, item.description);

    if (input) {
      const formData = { ...item, description: input };
      try {
        const response = await axios.put(
          `${url}/api/expenses/${item._id}`,
          formData,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        // console.log(response.data);
        updateExpense(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const options = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <tr key={item._id}>
      <td>{new Date(item.expenseDate).toLocaleDateString("en-US", options)}</td>
      <td>{item.amount}</td>
      <td>{item.description}</td>
      <td>{categoryName(item.categoryId)}</td>
      <td style={{ width: "102px" }}>
        <button
          onClick={() => {
            handleEdit(item);
          }}
          style={{ marginRight: "10px" }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleRemove(item);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

// import axios from "axios";
// import { url } from "./Config";

// export default function ExpenseItem({
//   item,
//   categories,
//   removeExpense,
//   updateExpense,
// }) {
//   const categoryName = (id) => {
//     const category = categories.find((ele) => ele._id === id);
//     // return category.name; // we cant directly do like this it shows error
//     // if i do not use if else condition then..
//     //  if the category is not found then it returns undefined.. so undefined.name throws an error
//     if (category) {
//       return category.name;
//     } else {
//       return "N/A (not available)";
//     }
//   };

//   const handleRemove = async (item) => {
//     const userConfirm = window.confirm("Are you sure??");
//     if (userConfirm) {
//       try {
//         const response = await axios.delete(`${url}/api/expenses/${item._id}`, {
//           headers: { Authorization: localStorage.getItem("token") },
//         });
//         // console.log(response.data);
//         removeExpense(response.data);
//       } catch (err) {
//         console.log(err.message);
//       }
//     }
//   };

//   const handleEdit = async (item) => {
//     const input = prompt(`Enter Description to edit`, item.description);

//     if (input) {
//       const formData = { ...item, description: input };
//       try {
//         const response = await axios.put(
//           `${url}/api/expenses/${item._id}`,
//           formData,
//           {
//             headers: { Authorization: localStorage.getItem("token") },
//           }
//         );

//         // console.log(response.data);
//         updateExpense(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
//   return (
//     <tr key={item._id}>
//       <td>{item.expenseDate}</td>
//       <td>{item.amount}</td>
//       <td>{item.description}</td>
//       <td>{categoryName(item.categoryId)}</td>
//       <td>
//         <button
//           onClick={() => {
//             handleRemove(item);
//           }}
//         >
//           remove
//         </button>
//         <button
//           onClick={() => {
//             handleEdit(item);
//           }}
//         >
//           edit
//         </button>
//       </td>
//     </tr>
//   );
// }
