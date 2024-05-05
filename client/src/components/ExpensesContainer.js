import { useState } from "react";

import ExpensesTable from "./ExpensesTable";
import ExpenseForm from "./ExpenseForm";
import axios from "axios";

export default function ExpensesContainer({
  expenses,
  categories,
  addExpense,
  removeExpense,
  updateExpense,
  deleteAllExpenses,
}) {
  const [search, setSearch] = useState("");

  const calculateTotalExpenses = () => {
    // let sum = 0;
    // expenses.forEach((ele) => (sum += ele.amount));
    // return sum;
    const total = filteredExpense().reduce((acc, cv) => {
      return acc + cv.amount;
    }, 0);
    return total;
  };

  const filteredExpense = () => {
    return expenses.filter((ele) =>
      ele.description.charAt(0).toLowerCase().includes(search.toLowerCase())
    );
  };

  const deleteAll = async () => {
    const userConfirm = window.confirm("Are you sure??");
    if (userConfirm) {
      try {
        const response = await axios.delete(
          "http://localhost:3050/api/expenses",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        deleteAllExpenses(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="grid-container" style={{ gridTemplateColumns: "3fr 1fr" }}>
      <div style={{ width: "100%" }}>
        <h2>Listing Expenses : {filteredExpense().length}</h2>
        <input
          type="text"
          value={search}
          placeholder="Search Expenses..."
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "10px", maxWidth: "320px" }}
        />
        <ExpensesTable
          expenses={filteredExpense()}
          categories={categories}
          removeExpense={removeExpense}
          updateExpense={updateExpense}
        />
        <div className="flex-container">
          <h2>Total Expenses : {calculateTotalExpenses()}</h2>
          <button id="delete-all-btn" onClick={deleteAll}>
            DeleteAll
          </button>
        </div>
      </div>

      <ExpenseForm categories={categories} addExpense={addExpense} />
    </div>
  );
}

// import { useState } from "react";

// import ExpensesTable from "./ExpensesTable";
// import ExpenseForm from "./ExpenseForm";
// import axios from "axios";

// export default function ExpensesContainer({
//   expenses,
//   categories,
//   addExpense,
//   removeExpense,
//   updateExpense,
//   deleteAllExpenses,
// }) {
//   const [search, setSearch] = useState("");

//   const calculateTotalExpenses = () => {
//     // let sum = 0;
//     // expenses.forEach((ele) => (sum += ele.amount));
//     // return sum;
//     const total = filteredExpense().reduce((acc, cv) => {
//       return acc + cv.amount;
//     }, 0);
//     return total;
//   };

//   const filteredExpense = () => {
//     return expenses.filter((ele) =>
//       ele.description.charAt(0).toLowerCase().includes(search.toLowerCase())
//     );
//   };

//   const deleteAll = async () => {
//     const userConfirm = window.confirm("Are you sure??");
//     if (userConfirm) {
//       try {
//         const response = await axios.delete(
//           "http://localhost:3050/api/expenses",
//           {
//             headers: { Authorization: localStorage.getItem("token") },
//           }
//         );

//         deleteAllExpenses(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
//   return (
//     <div>
//       <h2>Listing Expenses : {filteredExpense().length}</h2>
//       <input
//         type="text"
//         value={search}
//         placeholder="Search Expenses..."
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <ExpensesTable
//         expenses={filteredExpense()}
//         categories={categories}
//         removeExpense={removeExpense}
//         updateExpense={updateExpense}
//       />
//       <button onClick={deleteAll}>DeleteAll</button>
//       <h2>Total Expenses : {calculateTotalExpenses()}</h2>
//       <ExpenseForm categories={categories} addExpense={addExpense} />
//     </div>
//   );
// }
