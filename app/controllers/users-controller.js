const jwt = require("jsonwebtoken");
const usersCltr = {};

usersCltr.login = (req, res) => {
  const body = req.body;
  // console.log(body)
  if (
    body.email == process.env.EMAIL &&
    body.password == process.env.PASSWORD
  ) {
    // .email is because in the postman we sent ->   "email" : "admin@gmail.com",
    // .password is because in the postman we sent ->  "password": "secret123"
    const tokenData = { id: process.env.Id };
    const token = jwt.sign(
      tokenData,
      process.env.JWT_SECRET /*{expiresIn: "14d",}*/
    );
    res.json({ token: token });
  } else {
    res.status(401).json({
      // 401 means "Unauthorized" or "Not LoggedIn"
      notice: "Invalid email/password",
    });
  }
};

module.exports = usersCltr;
