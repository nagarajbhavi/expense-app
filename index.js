// npm install dotenv
require("dotenv").config(); // it read the dotenv file and load the contents of the dotenv file inside "process.env"
// console.log(process.env); // process is an object provided by dotenv package
const express = require("express");
const { checkSchema } = require("express-validator");
const cors = require("cors");
const app = express();
const PORT = 3050;

app.use(cors());
app.use(express.json());

// connect to data base
const configDB = require("./config/db");
configDB();

const categoriesCltr = require("./app/controllers/categories-controllers");
const expensesCltr = require("./app/controllers/expenses-controllers");
const usersCltr = require("./app/controllers/users-controller");

const authenticateUser = require("./app/middlewares/auth");

const categoryValidationSchema = require("./app/validations/category-validation");
const expenseValidationSchema = require("./app/validations/expense-validation");

app.get("/api/categories", authenticateUser, categoriesCltr.list);
app.post(
  "/api/categories",
  authenticateUser,
  checkSchema(categoryValidationSchema),
  categoriesCltr.create
);
app.put(
  "/api/categories/:id",
  authenticateUser,
  checkSchema(categoryValidationSchema),
  categoriesCltr.update
);
app.delete("/api/categories/:id", authenticateUser, categoriesCltr.destroy);
app.delete("/api/categories/", authenticateUser, categoriesCltr.destroyAll);

app.get("/api/expenses", authenticateUser, expensesCltr.list);
app.post(
  "/api/expenses",
  authenticateUser,
  checkSchema(expenseValidationSchema),
  expensesCltr.create
);
app.put(
  "/api/expenses/:id",
  authenticateUser,
  checkSchema(expenseValidationSchema),
  expensesCltr.update
);

app.delete("/api/expenses/:id", authenticateUser, expensesCltr.destroy);
app.delete("/api/expenses/", authenticateUser, expensesCltr.destroyAll);

app.post("/api/users/login", usersCltr.login); // login

app.listen(PORT, () => {
  console.log("server is running on port :", PORT);
});
