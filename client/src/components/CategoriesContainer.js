import { useState } from "react";

import CategoriesList from "./CategoriesList";
import CategoriesForm from "./CategoriesForm";

export default function CategoriesContainer({
  categories,
  handleAdd,
  handleUpdate,
  handleRemove,
  deleteAllCategories,
}) {
  const [search, setSearch] = useState("");

  const filteredCategories = () => {
    const newArr = categories.filter((ele) => {
      return ele.name.charAt().toLowerCase().includes(search.toLowerCase());
    });
    // console.log(result);
    return newArr;
  };

  return (
    <div className="grid-container cat-flex">
      <div>
        <h2>Listing Categories : {filteredCategories().length}</h2>
        <input
          type="text"
          value={search}
          placeholder="Search Categories..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <CategoriesList
          filteredCategories={filteredCategories()}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
          deleteAllCategories={deleteAllCategories}
        />
      </div>
      <CategoriesForm handleAdd={handleAdd} />
    </div>
  );
}

// import { useState } from "react";

// import CategoriesList from "./CategoriesList";
// import CategoriesForm from "./CategoriesForm";

// export default function CategoriesContainer({
//   categories,
//   handleAdd,
//   handleUpdate,
//   handleRemove,
//   deleteAllCategories,
// }) {
//   const [search, setSearch] = useState("");

//   const filteredCategories = () => {
//     const newArr = categories.filter((ele) => {
//       return ele.name.charAt().toLowerCase().includes(search.toLowerCase());
//     });
//     // console.log(result);
//     return newArr;
//   };

//   return (
//     <div>
//       <h2>Listing Categories : {filteredCategories().length}</h2>
//       <input
//         type="text"
//         value={search}
//         placeholder="Search Categories..."
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <CategoriesList
//         filteredCategories={filteredCategories()}
//         handleUpdate={handleUpdate}
//         handleRemove={handleRemove}
//         deleteAllCategories={deleteAllCategories}
//       />
//       <CategoriesForm handleAdd={handleAdd} />
//     </div>
//   );
// }
