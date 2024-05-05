const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  /*console.log(token); // to see token in the terminal
  next();*/
  if (token) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(tokenData); // { id: 'dct123', iat: 1712547786 } iat -> issued at time
      next();
    } catch (e) {
      res.status(401).json(e);
    }
  } else {
    res.status(401).json({ error: "token is required" });
  }
};

module.exports = authenticateUser;
