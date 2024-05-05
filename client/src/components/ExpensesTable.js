import ExpenseItem from "./ExpenseItem";
export default function ExpensesTable({
  expenses,
  categories,
  removeExpense,
  updateExpense,
}) {
  return (
    <div>
      {expenses.length === 0 ? (
        <h2>No Expenses Found!! Add Your First Expenses</h2>
      ) : (
        <>
          <table id="expenses">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((ele) => (
                <ExpenseItem
                  key={ele._id}
                  item={ele}
                  categories={categories}
                  removeExpense={removeExpense}
                  updateExpense={updateExpense}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

// import ExpenseItem from "./ExpenseItem";
// export default function ExpensesTable({
//   expenses,
//   categories,
//   removeExpense,
//   updateExpense,
// }) {
//   return (
//     <div>
//       {expenses.length === 0 ? (
//         <h2>No Expenses Found!! Add Your First Expenses</h2>
//       ) : (
//         <>
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenses.map((ele) => (
//                 <ExpenseItem
//                   key={ele._id}
//                   item={ele}
//                   categories={categories}
//                   removeExpense={removeExpense}
//                   updateExpense={updateExpense}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// }
