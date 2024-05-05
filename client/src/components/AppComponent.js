// OCT-2023 -- BackEnd -- Expense-App-New -- index.js

import React, { useState, useEffect } from "react";

import axios from "axios";

import { appName } from "./Config";
import CategoriesContainer from "./CategoriesContainer";
import ExpensesContainer from "./ExpensesContainer";
import LoginForm from "./LoginForm";
import "./AppComponent.css";

export default function AppComponent() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (userLoggedIn) {
      (async function () {
        try {
          const categoryResponse = await axios.get(
            "http://localhost:3050/api/categories",
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          // console.log(response);
          setCategories(categoryResponse.data);

          const expenseResponse = await axios.get(
            "http://localhost:3050/api/expenses",
            {
              headers: { Authorization: localStorage.getItem("token") },
            }
          );
          // console.log(expenseResponse);
          setExpenses(expenseResponse.data);
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      setCategories([]);
      setExpenses([]);
    }
  }, [userLoggedIn]);

  // // prevent from reload
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserLoggedIn(true);
    }
  }, []);

  const handleAdd = (category) => {
    setCategories([...categories, category]);
  };

  const handleUpdate = (obj) => {
    const newArr = categories.map((ele) => {
      if (ele._id === obj._id) {
        return obj;
      } else {
        return ele;
      }
    });
    setCategories(newArr);
  };

  const handleRemove = (obj) => {
    const newArr = categories.filter((ele /* => ele._id !== obj._id);*/) => {
      return ele._id !== obj._id;
    });
    setCategories(newArr);
  };

  const deleteAllCategories = () => {
    setCategories([]);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const removeExpense = (expense) => {
    const newArr = expenses.filter((ele) => ele._id !== expense._id);
    setExpenses(newArr);
  };

  const updateExpense = (expense) => {
    const newArr = expenses.map((ele) => {
      if (ele._id === expense._id) {
        return expense;
      } else {
        return ele;
      }
    });
    setExpenses(newArr);
  };

  const deleteAllExpenses = () => {
    setExpenses([]);
  };

  const loginSuccess = () => {
    setUserLoggedIn(true);
  };

  const logoutUser = () => {
    setUserLoggedIn(false);
    localStorage.removeItem("token");
  };
  return (
    <div>
      {userLoggedIn ? (
        <>
          <div className="flex-container" id="header">
            <h1>{appName}</h1>
            <button id="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
          <CategoriesContainer
            categories={categories}
            handleAdd={handleAdd}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
            deleteAllCategories={deleteAllCategories}
          />
          <ExpensesContainer
            expenses={expenses}
            categories={categories}
            addExpense={addExpense}
            removeExpense={removeExpense}
            updateExpense={updateExpense}
            deleteAllExpenses={deleteAllExpenses}
          />
        </>
      ) : (
        <React.Fragment>
          <LoginForm loginSuccess={loginSuccess} />
        </React.Fragment>
      )}
    </div>
  );
}

// // OCT-2023 -- BackEnd -- Expense-App-New -- index.js

// import { useState, useEffect } from "react";

// import axios from "axios";

// import { appName } from "./Config";
// import CategoriesContainer from "./CategoriesContainer";
// import ExpensesContainer from "./ExpensesContainer";
// import LoginForm from "./LoginForm";

// export default function AppComponent() {
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     if (userLoggedIn) {
//       (async function () {
//         try {
//           const categoryResponse = await axios.get(
//             "http://localhost:3050/api/categories",
//             {
//               headers: { Authorization: localStorage.getItem("token") },
//             }
//           );
//           // console.log(response);
//           setCategories(categoryResponse.data);

//           const expenseResponse = await axios.get(
//             "http://localhost:3050/api/expenses",
//             {
//               headers: { Authorization: localStorage.getItem("token") },
//             }
//           );
//           // console.log(expenseResponse);
//           setExpenses(expenseResponse.data);
//         } catch (err) {
//           console.log(err);
//         }
//       })();
//     } else {
//       setCategories([]);
//       setExpenses([]);
//     }
//   }, [userLoggedIn]);

//   // // prevent from reload
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setUserLoggedIn(true);
//     }
//   }, []);

//   const handleAdd = (category) => {
//     setCategories([...categories, category]);
//   };

//   const handleUpdate = (obj) => {
//     const newArr = categories.map((ele) => {
//       if (ele._id === obj._id) {
//         return obj;
//       } else {
//         return ele;
//       }
//     });
//     setCategories(newArr);
//   };

//   const handleRemove = (obj) => {
//     const newArr = categories.filter((ele /* => ele._id !== obj._id);*/) => {
//       return ele._id !== obj._id;
//     });
//     setCategories(newArr);
//   };

//   const deleteAllCategories = () => {
//     setCategories([]);
//   };

//   const addExpense = (expense) => {
//     setExpenses([...expenses, expense]);
//   };

//   const removeExpense = (expense) => {
//     const newArr = expenses.filter((ele) => ele._id !== expense._id);
//     setExpenses(newArr);
//   };

//   const updateExpense = (expense) => {
//     const newArr = expenses.map((ele) => {
//       if (ele._id === expense._id) {
//         return expense;
//       } else {
//         return ele;
//       }
//     });
//     setExpenses(newArr);
//   };

//   const deleteAllExpenses = () => {
//     setExpenses([]);
//   };

//   const loginSuccess = () => {
//     setUserLoggedIn(true);
//   };

//   const logoutUser = () => {
//     setUserLoggedIn(false);
//     localStorage.removeItem("token");
//   };
//   return (
//     <div>
//       {userLoggedIn ? (
//         <>
//           <h1>{appName}</h1>
//           <button onClick={logoutUser}>Logout</button>
//           <CategoriesContainer
//             categories={categories}
//             handleAdd={handleAdd}
//             handleUpdate={handleUpdate}
//             handleRemove={handleRemove}
//             deleteAllCategories={deleteAllCategories}
//           />
//           <ExpensesContainer
//             expenses={expenses}
//             categories={categories}
//             addExpense={addExpense}
//             removeExpense={removeExpense}
//             updateExpense={updateExpense}
//             deleteAllExpenses={deleteAllExpenses}
//           />
//         </>
//       ) : (
//         <React.Fragment>
//           <LoginForm loginSuccess={loginSuccess} />
//         </React.Fragment>
//       )}
//     </div>
//   );
// }
