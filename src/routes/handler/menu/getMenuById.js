const prisma = require("../../../utils/db");

const getMenuById = async (req, res) => {
  try {
    const menuId = parseInt(req.params.id);

    const menu = await prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) {
      return res.status(404).json({
        error: "Menu not found",
      });
    }

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
};

module.exports = getMenuById;
