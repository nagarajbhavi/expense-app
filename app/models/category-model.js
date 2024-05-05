const mongoose = require("mongoose"); // to get Schema & model from mongoose
const { Schema, model } = mongoose; // extracting schema and model from mongoose

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);
module.exports = Category;
