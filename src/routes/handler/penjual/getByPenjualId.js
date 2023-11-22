const { parse } = require("dotenv");
const prisma = require("../../../utils/db");

const getByPenjualId = async (req, res) => {
  try {
    const penjualId = parseInt(req.params.id);

    const penjual = await prisma.penjual.findUnique({
      where: {
        id: penjualId,
      },
    })

    if (!penjual) {
      return res.status(404).json({
        status: "error",
        message: "Penjual not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: penjual,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getByPenjualId;
