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

    const dataMenu = reviewMenu.map((item) => {
      return {
        menu: item.menu.item,
      };
    });

    const combinedMenus = dataMenu.map((item) => item.menu).join(" ");
    const separatedWords = combinedMenus.split(" ");

    console.log(`combinedMenus: ${combinedMenus}`);
    console.log(`separatedWords: ${separatedWords}`);

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
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      data: similarMenu.map((item) => {
        return {
          id: item.id,
          item: item.item,
          price: item.price,
          image: item.image,
          penjual_name: item.penjual.name,
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
