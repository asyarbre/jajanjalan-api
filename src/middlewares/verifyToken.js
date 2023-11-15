const jwt = require("jsonwebtoken");
const { JWT_SECRET_ACCESS_TOKEN } = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      status: "error",
      message: "Access denied",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
