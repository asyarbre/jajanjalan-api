const prisma = require("../../../utils/db");

const createPenjual = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const userId = req.userData.id;

    const checkPenjual = await prisma.penjual.findUnique({
      where: {
        userId,
      },
    });
    if (checkPenjual) {
      return res.status(400).json({
        status: "error",
        message: "Penjual already exists",
      });
    }

    const penjual = await prisma.penjual.create({
      data: {
        name,
        address,
        phone,
        userId,
      },
    });

    res.status(201).json({
      status: "success",
      data: {
        penjual,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = createPenjual;
