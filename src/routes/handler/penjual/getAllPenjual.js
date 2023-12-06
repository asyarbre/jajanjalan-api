const prisma = require("../../../utils/db");

const getAllPenjual = async (req, res) => {
  try {
    const penjual = await prisma.penjual.findMany({})

    res.status(200).json({
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
}

module.exports = getAllPenjual;