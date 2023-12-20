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
    
    const getAvgRating = await prisma.review.groupBy({
      by: ["menuId"],
      _avg: {
        rating: true,
      },
    });

    res.json({
      message: "Menu found",
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
            rating: avgRating ? parseFloat(avgRating._avg.rating.toFixed(1)) : 0,
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
}

module.exports = getMenuByPenjualId;