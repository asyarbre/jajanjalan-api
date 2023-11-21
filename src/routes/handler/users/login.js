const prisma = require("../../../utils/db");
const bcrypt = require("bcrypt");
const { JWT_SECRET_ACCESS_TOKEN, JWT_ACCESS_TOKEN_EXPIRED } = process.env;
const jwt = require("jsonwebtoken");
const { validateLogin } = require("../../../validations/user.validation");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //validate data
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
    
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "email not found",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "error",
        message: "password is invalid",
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role:user.role }, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });

    res.status(200).json({
      status: "Login success",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = login;
