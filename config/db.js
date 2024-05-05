const mongoose = require("mongoose");

const configDB = async () => {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/ExpApp");
    console.log("Successfully connected to DB");
  } catch (err) {
    console.log("error connecting to DB", err);
  }
};

// const configDB = () => {
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/ExpApp")
//     .then(() => {
//       console.log("connected to db");
//     })
//     .catch(() => {
//       console.log("error connected to db");
//     });
// };

module.exports = configDB;
