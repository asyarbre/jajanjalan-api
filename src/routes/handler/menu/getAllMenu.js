const prisma = require("../../../utils/db");

const getAllMenu = async (req, res) => {
  try {
    const menu = await prisma.menu.findMany({
      include: {
        penjual: {
          select: {
            name: true,
            address: true,
            phone: true,
            lat: true,
            lon: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        menu,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = getAllMenu;