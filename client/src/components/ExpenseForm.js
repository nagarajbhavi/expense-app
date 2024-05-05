import { useState } from "react";
import axios from "axios";
import { url } from "./Config";
// import _ from "lodash";
import { isEmpty } from "lodash";

export default function ExpenseForm({ categories, addExpense }) {
  const [expenseDate, setExpenseDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const validateErrors = () => {
    if (expenseDate.trim().length === 0) {
      errors.expenseDate = "Date is required";
    } else if (new Date(expenseDate) > new Date()) {
      errors.expenseDate = "Date can not be greater than today's date";
    }
    if (amount.trim().length === 0) {
      errors.amount = "Amount is required";
    }
    if (description.trim().length === 0) {
      errors.description = "Description is required";
    }
    if (categoryId.trim().length === 0) {
      errors.categoryId = "Category is required";
    }
  };

  const errorsColor = { color: "red" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      expenseDate: expenseDate,
      amount: amount,
      categoryId: categoryId,
      description: description,
    };

    validateErrors();

    /*_.isEmpty(errors)*/ /*Object.keys(errors).length === 0*/

    if (isEmpty(errors)) {
      try {
        const response = await axios.post(`${url}/api/expenses`, formData, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        // console.log(response.data);
        addExpense(response.data);
        setFormErrors({});
        setExpenseDate("");
        setAmount("");
        setCategoryId("");
        setDescription("");
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <h2>Add Expenses</h2>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="expDate">Expense Date</label>
        <br /> */}
        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          id="expDate"
        />
        {formErrors && (
          <span style={errorsColor}>{formErrors.expenseDate}</span>
        )}
        {/* <br />
        <label htmlFor="amt">Enter Amount</label> */}
        <br />
        <input
          type="number"
          value={amount}
          min="1"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          id="amt"
        />
        {formErrors && <span style={errorsColor}>{formErrors.amount}</span>}
        {/* <br /> */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => {
            return (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            );
          })}
        </select>
        {formErrors && <span style={errorsColor}>{formErrors.categoryId}</span>}
        {/* <br /> */}
        {/* <label htmlFor="description">Description</label>
        <br /> */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          placeholder="Description"
        />
        {formErrors && (
          <span style={errorsColor}>{formErrors.description}</span>
        )}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import { url } from "./Config";
// // import _ from "lodash";
// import { isEmpty } from "lodash";

// export default function ExpenseForm({ categories, addExpense }) {
//   const [expenseDate, setExpenseDate] = useState("");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState("");

//   const [formErrors, setFormErrors] = useState({});
//   const errors = {};

//   const validateErrors = () => {
//     if (expenseDate.trim().length === 0) {
//       errors.expenseDate = "Date is required";
//     } else if (new Date(expenseDate) > new Date()) {
//       errors.expenseDate = "Date can not be greater than today's date";
//     }
//     if (amount.trim().length === 0) {
//       errors.amount = "Amount is required";
//     }
//     if (description.trim().length === 0) {
//       errors.description = "Description is required";
//     }
//     if (categoryId.trim().length === 0) {
//       errors.categoryId = "Category is required";
//     }
//   };

//   const errorsColor = { color: "red" };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       expenseDate: expenseDate,
//       amount: amount,
//       categoryId: categoryId,
//       description: description,
//     };

//     validateErrors();

//     /*_.isEmpty(errors)*/ /*Object.keys(errors).length === 0*/

//     if (isEmpty(errors)) {
//       try {
//         const response = await axios.post(`${url}/api/expenses`, formData, {
//           headers: { Authorization: localStorage.getItem("token") },
//         });
//         // console.log(response.data);
//         addExpense(response.data);
//         setFormErrors({});
//         setExpenseDate("");
//         setAmount("");
//         setCategoryId("");
//         setDescription("");
//       } catch (err) {
//         console.log(err.response.data);
//       }
//     } else {
//       setFormErrors(errors);
//     }
//   };

//   return (
//     <div>
//       <h3>Add Expenses</h3>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="expDate">Expense Date</label>
//         <br />
//         <input
//           type="date"
//           value={expenseDate}
//           onChange={(e) => setExpenseDate(e.target.value)}
//           id="expDate"
//         />
//         {formErrors && (
//           <span style={errorsColor}>{formErrors.expenseDate}</span>
//         )}
//         <br />
//         <label htmlFor="amt">Enter Amount</label>
//         <br />
//         <input
//           type="number"
//           value={amount}
//           min="1"
//           onChange={(e) => setAmount(e.target.value)}
//           id="amt"
//         />
//         {formErrors && <span style={errorsColor}>{formErrors.amount}</span>}
//         <br />
//         <select
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => {
//             return (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             );
//           })}
//         </select>
//         {formErrors && <span style={errorsColor}>{formErrors.categoryId}</span>}
//         <br />
//         <label htmlFor="description">Description</label>
//         <br />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           id="description"
//         />
//         {formErrors && (
//           <span style={errorsColor}>{formErrors.description}</span>
//         )}
//         <br />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
