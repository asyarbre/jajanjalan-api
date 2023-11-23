const prisma = require("../../../utils/db");

const getMenuByPenjualId = async (req, res) => {
  try {
    const checkPenjualId = await prisma.penjual.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!checkPenjualId) {
      return res.status(404).json({
        error: "Penjual not found",
      });
    }

    const menu = await prisma.menu.findMany({
      where: {
        penjualId: parseInt(req.params.id),
      },
    });

    res.json({
      message: "Menu found",
      data: menu,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = getMenuByPenjualId;