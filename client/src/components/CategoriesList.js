import CategoryItem from "./CategoryItem";
import axios from "axios";
export default function CategoriesList({
  filteredCategories,
  handleUpdate,
  handleRemove,
  deleteAllCategories,
}) {
  const deleteAll = async () => {
    const userConfirm = window.confirm("Are you sure??");
    if (userConfirm) {
      try {
        const response = await axios.delete(
          "http://localhost:3050/api/categories",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        deleteAllCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      {filteredCategories.length === 0 ? (
        <h3>No results Found.!!</h3>
      ) : (
        <>
          <ul id="category-list">
            {filteredCategories.map((ele) => {
              return (
                <CategoryItem
                  key={ele._id}
                  item={ele}
                  handleUpdate={handleUpdate}
                  handleRemove={handleRemove}
                />
              );
            })}
          </ul>
          <button id="delete-all-btn" onClick={deleteAll}>
            DeleteAll
          </button>
        </>
      )}
    </div>
  );
}

// import CategoryItem from "./CategoryItem";
// import axios from "axios";
// export default function CategoriesList({
//   filteredCategories,
//   handleUpdate,
//   handleRemove,
//   deleteAllCategories,
// }) {
//   const deleteAll = async () => {
//     const userConfirm = window.confirm("Are you sure??");
//     if (userConfirm) {
//       try {
//         const response = await axios.delete(
//           "http://localhost:3050/api/categories",
//           {
//             headers: { Authorization: localStorage.getItem("token") },
//           }
//         );
//         deleteAllCategories(response.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
//   return (
//     <div>
//       {filteredCategories.length === 0 ? (
//         <h3>No results Found.!!</h3>
//       ) : (
//         <>
//           <ul>
//             {filteredCategories.map((ele) => {
//               return (
//                 <CategoryItem
//                   key={ele._id}
//                   item={ele}
//                   handleUpdate={handleUpdate}
//                   handleRemove={handleRemove}
//                 />
//               );
//             })}
//           </ul>
//           <button onClick={deleteAll}>DeleteAll</button>
//         </>
//       )}
//     </div>
//   );
// }
