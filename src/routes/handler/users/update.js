const prisma = require("../../../utils/db");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        password: hashedPassword,
        role,
      },
    });

    res.json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = update;