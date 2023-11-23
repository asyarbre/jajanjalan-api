const prisma = require("../../../utils/db");

const deletePenjual = async (req, res) => {
  try {
    const penjualId = parseInt(req.params.id);

    const penjual = await prisma.penjual.findUnique({
      where: {
        id: penjualId,
      },
    });
    if (!penjual) {
      return res.status(404).json({
        status: "error",
        message: "Penjual not found",
      });
    }
    
    await prisma.penjual.delete({
      where: {
        id: penjualId,
      },
    });

    res.json({
      status: "Penjual deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = deletePenjual;
