const Expense = require("../models/expense-model");
const { validationResult } = require("express-validator");
const expensesCltr = {};

expensesCltr.list = (req, res) => {
  // list is a user defined function name
  // read all expenses
  Expense.find() /*.populate('categoryId')*/
    .then((exp) => {
      res.json(exp);
    })
    .catch((err) => {
      res.json(err);
    });
};
expensesCltr.create = (req, res) => {
  // create is a user defined function name
  // create expense
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  const expense = new Expense(body);
  expense
    .save()
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expensesCltr.update = (req, res) => {
  // update is a user defined function name
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  const body = req.body;
  Expense.findByIdAndUpdate(id, body, { new: true })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};
expensesCltr.destroy = (req, res) => {
  // destroy is a user defined function name
  //delete- expense
  const id = req.params.id;
  Expense.findByIdAndDelete(id)
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

expensesCltr.destroyAll = (req, res) => {
  Expense.deleteMany()
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = expensesCltr;
