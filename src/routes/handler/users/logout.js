const prisma = require("../../../utils/db");

const logout = async (req, res) => {
  try {
    const id = req.body.user_id;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "user not found",
      });
    }

    const token = null;

    res.status(200).json({
      status: "Logout success",
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = logout;
