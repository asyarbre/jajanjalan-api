const prisma = require("../../../utils/db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    res.json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = register;
