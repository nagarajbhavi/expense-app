const mongoose = require("mongoose"); // to get Schema & model from mongoose
const { Schema, model } = mongoose; // extracting schema and model from mongoose
const expenseSchema = new Schema(
  {
    expenseDate: {
      type: Date,
    },
    amount: {
      type: Number,
      min: 1,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      // go to mongodb to see this ObjectId -->  _id: ObjectId(65d34c48cdb8aecb018db8c4)
      ref: "Category", // foreign key
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Expense = model("Expense", expenseSchema);
module.exports = Expense;
