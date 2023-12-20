const prisma = require("../../../utils/db");

const getMenuById = async (req, res) => {
  try {
    const menu_id = parseInt(req.params.id);

    const menu = await prisma.menu.findUnique({
      where: {
        id: menu_id,
      },
      include: {
        penjual: {
          select: {
            name: true,
            address: true,
            phone: true,
            lat: true,
            lon: true,
            isOpen: true,
            description: true,
          },
        },
      },
    });

    if (!menu) {
      return res.status(404).json({
        error: "Menu not found",
      });
    }

    //get average rating by menu id parameter
    const getAvgRating = await prisma.review.groupBy({
      by: ["menuId"],
      _avg: {
        rating: true,
      },
      where: {
        menuId: menu_id,
      },
    });

    res.json({
      message: "Menu found",
      data: {
        id: menu.id,
        penjualId: menu.penjualId,
        menu: {
          item: menu.item,
          price: menu.price,
          description: menu.description,
          image: menu.image,
          rating: getAvgRating
            ? parseFloat(getAvgRating[0]._avg.rating.toFixed(1))
            : 0,
        },
        penjual: {
          name: menu.penjual.name,
          address: menu.penjual.address,
          phone: menu.penjual.phone,
          lat: menu.penjual.lat,
          lon: menu.penjual.lon,
          isOpen: menu.penjual.isOpen,
          description: menu.penjual.description,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = getMenuById;
