const prisma = require("../../../utils/db");

const searchMenu = async (req, res) => {
  try {
    const { item } = req.query;

    const menu = await prisma.menu.findMany({
      where: {
        item: {
          contains: item,
        },
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

    const getAvgRating = await prisma.review.groupBy({
      by: ["menuId"],
      _avg: {
        rating: true,
      },
    });

    const data = menu.map((item) => {
      const avgRating = getAvgRating.find((el) => el.menuId === item.id);
      return {
        id: item.id,
        penjualId: item.penjualId,
        menu: {
          item: item.item,
          price: item.price,
          description: item.description,
          image: item.image,
          rating: avgRating ? parseFloat(avgRating._avg.rating.toFixed(1)) : 0,
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
    });

    res.json({
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
            //limit 1 number after comma
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
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = searchMenu;
