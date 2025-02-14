const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      status: 401,
      errorMessage: "Token missing.",
    });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        errorMessage: "Token is invalid",
      });
    }
    req.user = payload;
    next();
  });
};

module.exports = { verifyToken };
