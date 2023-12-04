const prisma = require("../../../utils/db");
const bcrypt = require("bcrypt");
const { validateRegister } = require("../../../validations/user.validation");

const register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    //validate data
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({
        error: error.message,
      });
    }

    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const defaultImage =
      "https://storage.googleapis.com/jajanjalan-storage/images/profile/default-profile.jpg";

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image: defaultImage,
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
