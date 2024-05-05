const categoryValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
};

module.exports = categoryValidationSchema;
