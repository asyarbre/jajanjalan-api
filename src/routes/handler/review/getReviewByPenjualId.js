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
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      message: "Review found",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getReviewByPenjualId;
