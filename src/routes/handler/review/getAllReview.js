const prisma = require("../../../utils/db");

const getAllReview = async (req, res) => {
  try {
    const review = await prisma.review.findMany({
      include: {
        menu: {
          select: {
            item: true,
          },
        },
      },
    });

    res.json({
      status: "success",
      data: review.map((item) => {
        return {
          id: item.id,
          userId: item.userId,
          menu: item.menu.item,
          rating: item.rating,
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

module.exports = getAllReview;
