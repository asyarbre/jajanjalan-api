const prisma = require("../../../utils/db");

const getReviewById = async (req, res) => {
  try {
    const menuId = parseInt(req.params.id);
    const review = await prisma.review.findUnique({
      where: {
        id: menuId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
    });
    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getReviewById;
