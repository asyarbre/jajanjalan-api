const prisma = require("../../../utils/db");

const RecomendationMenuByReview = async (req, res) => {
  try {
    const userId = req.userData.id;

    const reviewMenu = await prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: {
        menu: {
          select: {
            item: true,
          },
        },
      },
    });

    const getMenuAvgRating = await prisma.review.groupBy({
      by: ["menuId"],
      _avg: {
        rating: true,
      },
    });

    const dataMenu = reviewMenu.map((item) => {
      return {
        menu: item.menu.item,
      };
    });

    const avgRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });

    const combinedMenus = dataMenu.map((item) => item.menu).join(" ");
    const separatedWords = combinedMenus.split(" ");

    const similarMenu = await prisma.menu.findMany({
      where: {
        OR: [
          ...separatedWords.map((item) => {
            return {
              item: {
                contains: item,
              },
              NOT: {
                review: {
                  some: {
                    userId: userId,
                  },
                },
              },
            };
          }),
        ],
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

    if (reviewMenu.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [],
      });
    }

    res.status(200).json({
      status: "success",
      data: similarMenu.map((item) => {
        const ratingAvg = getMenuAvgRating.find(
          (el) => el.menuId === item.id
        );
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

module.exports = RecomendationMenuByReview;
