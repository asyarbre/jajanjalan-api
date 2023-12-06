const prisma = require("../../../utils/db");

const getRecomenMenuByHighRating = async (req, res) => {
  try {
    const recomenMenu = await prisma.$queryRaw`
      SELECT menu.id, menu.item, menu.description, menu.price, menu.image, penjual.name, AVG(review.rating) AS rating
      FROM menu
      JOIN penjual ON menu.penjualId = penjual.id
      JOIN review ON menu.id = review.menuId
      GROUP BY menu.id, menu.item, menu.description, menu.price, menu.image, penjual.name
      ORDER BY rating DESC
      LIMIT 5
    `;

    res.status(200).json({
      status: "success",
      data: recomenMenu.map((item) => {
        return {
          id: item.id,
          item: item.item,
          price: item.price,
          image: item.image,
          penjual_name: item.name,
          rating: item.rating,
        };
      })
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = getRecomenMenuByHighRating;
