const prisma = require("../../../utils/db");

const updatePenjual = async (req, res) => {
  try {
    const { name, address, phone, lat, lon, isOpen, description } = req.body;
    const userId = req.userData.id;
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

    if (penjual.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden access, you are not the owner of this penjual",
      });
    }

    const updatedPenjual = await prisma.penjual.update({
      where: {
        id: penjualId,
      },
      data: {
        name,
        address,
        phone,
        lat,
        lon,
        isOpen,
        description,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        penjual: updatedPenjual,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = updatePenjual;
