const Category = require("../models/category-model");
const { validationResult } = require("express-validator");
const categoriesCltr = {};

categoriesCltr.list = async (req, res) => {
  try {
    const cat = await Category.find();
    res.json(cat); // sending to FrontEnd
  } catch (err) {
    console.log(err);
    res.status(500).json({ notice: "Internal Server Error" });
  }
};
// categoriesCltr.list = (req, res) => {
//   // 'list' is a user defined function name
//   Category.find()
//     .then((cat) => {
//       res.json(cat);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };

categoriesCltr.create = async (req, res) => {
  // 'create' is a user defined function name
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  const cat = new Category(body);
  try {
    await cat.save(); // its will throw an error so we write this in try & catch block
    res.status(201).json(cat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ notice: "Internal Server Error" });
  }
};

// categoriesCltr.create = (req, res) => {
//   // 'create' is a user defined function name
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const body = req.body;
//   const cat = new Category(body);
//   cat
//     .save()
//     .then((cat) => {
//       res.json(cat);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// };

categoriesCltr.update = (req, res) => {
  // 'update' is a user defined function name
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id;
  const body = req.body;
  Category.findByIdAndUpdate(id, body, { new: true })
    /* {new: true} is used to send the "updated" record from the server to Client. */
    .then((cat) => {
      res.json(cat);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoriesCltr.destroy = (req, res) => {
  // 'destroy' is a user defined function name
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

categoriesCltr.destroyAll = (req, res) => {
  // 'destroyAll' is a user defined function name
  Category.deleteMany()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = categoriesCltr;
