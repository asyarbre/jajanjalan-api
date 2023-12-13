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

    const avgRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    res.json({
      status: "success",
      data: menu.map((item) => {
        return {
          id: item.id,
          penjualId: item.penjualId,
          menu: {
            item: item.item,
            price: item.price,
            description: item.description,
            image: item.image,
            rating: parseFloat(avgRating._avg.rating),
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
