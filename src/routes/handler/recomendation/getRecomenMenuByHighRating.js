const prisma = require("../../../utils/db");

const getRecomenMenuByHighRating = async (req, res) => {
  try {
    const getMenusHighRating = await prisma.review.groupBy({
      by: ["menuId"],
      _avg: {
        rating: true,
      },
      orderBy: {
        _avg: {
          rating: "desc",
        },
      },
    });

    const menuIds = getMenusHighRating.map((item) => item.menuId);

    const getMenus = await prisma.menu.findMany({
      where: {
        id: {
          in: menuIds,
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

    const data = getMenus.map((item) => {
      const avgRating = getMenusHighRating.find((el) => el.menuId === item.id);
      return {
        id: item.id,
        penjualId: item.penjualId,
        menu: {
          item: item.item,
          price: item.price,
          description: item.description,
          image: item.image,
          rating: avgRating ? parseFloat(avgRating._avg.rating) : 0, // Periksa apakah ada rating
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

    // Urutkan berdasarkan rating tertinggi ke terendah
    data.sort((a, b) => b.menu.rating - a.menu.rating);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getRecomenMenuByHighRating;
