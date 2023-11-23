const prisma = require("../../../utils/db");

const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.userData.id;
    const reviewId = parseInt(req.params.id);

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    if (review.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden",
      });
    }

    const updatedReview = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating,
        comment,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        review: updatedReview,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = updateReview;
