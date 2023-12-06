const prisma = require("../../../utils/db");

const getReviewByPenjualId = async (req, res) => {
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

    const review = await prisma.review.findMany({
      where: {
        penjualId: parseInt(req.params.id),
      },
      include: {
        penjual: {},
      },
    });

    res.json({
      message: "Review found",
      data: review.map((item) => {
        return {
          id: item.id,
          userId: item.userId,
          penjualId: item.penjualId,
          penjual_name: item.penjual.name,
          user: item.user,
          rating: item.rating,
          comment: item.comment,
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

module.exports = getReviewByPenjualId;
