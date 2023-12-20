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
            isOpen: true,
            description: true,
          },
        },
      },
    });

    const getAvgRating = await prisma.review.groupBy({
      by: ["menuId"],
      _avg: {
        rating: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: menu.map((item) => {
        const avgRating = getAvgRating.find((el) => el.menuId === item.id);
        return {
          id: item.id,
          penjualId: item.penjualId,
          menu: {
            item: item.item,
            price: item.price,
            description: item.description,
            image: item.image,
            rating: avgRating
              ? parseFloat(avgRating._avg.rating.toFixed(1))
              : 0,
          },
          penjual: {
            name: item.penjual.name,
            address: item.penjual.address,
            phone: item.penjual.phone,
            lat: item.penjual.lat,
            lon: item.penjual.lon,
            isOpen: item.penjual.isOpen,
            description: item.penjual.description,
          },
        };
      }),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getAllMenu;
