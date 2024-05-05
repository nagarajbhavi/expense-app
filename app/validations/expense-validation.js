const expenseValidationSchema = {
  expenseDate: {
    notEmpty: {
      errorMessage: "Expense date is required",
    },
  },
  amount: {
    notEmpty: {
      errorMessage: "Amount is required",
    },
    isLength: {
      min: 1,
    },
    isNumeric: {
      errorMessage: "amount should contain number",
    },
  },
  categoryId: {
    notEmpty: {
      errorMessage: "categoryId id is required",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "should enter description",
    },
  },
};

module.exports = expenseValidationSchema;
