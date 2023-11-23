const { parse } = require("dotenv");
const prisma = require("../../../utils/db");

const createReview = async (req, res) => {
  try {
    const { rating, comment, menu_id } = req.body;
    const userId = req.userData.id;

    //find penjualId by menuId
    const penjual_id = await prisma.menu.findUnique({
      where: {
        id: menu_id,
      },
      select: {
        penjualId: true,
      },
    });
    
    const checkMenu = await prisma.menu.findUnique({
      where: {
        id: menu_id,
      },
    });
    if (!checkMenu) {
      return res.status(400).json({
        status: "error",
        message: "Menu not found",
      });
    }

    const checkReview = await prisma.review.findFirst({
      where: {
        userId,
        menuId: menu_id,
      },
    });
    if (checkReview) {
      return res.status(400).json({
        status: "error",
        message: "You already review this menu",
      });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        menuId: menu_id,
        penjualId: penjual_id.penjualId,
        rating,
        comment,
      },
    });

    res.status(201).json({
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

module.exports = createReview;
