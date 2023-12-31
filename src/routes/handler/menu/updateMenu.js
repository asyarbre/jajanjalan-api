const prisma = require("../../../utils/db");
const path = require("path");
const storage = require("../../../utils/cloudStorage");

const updateMenu = async (req, res) => {
  try {
    const { item, price, description } = req.body;
    const image = req.file;
    const userId = req.userData.id;
    const menuId = parseInt(req.params.id);

    const penjualId = await prisma.penjual.findUnique({
      where: {
        userId,
      },
    });

    const menu = await prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });

    if (!menu) {
      return res.status(404).json({
        error: "Menu not found",
      });
    }

    if (menu.penjualId !== penjualId.id) {
      return res.status(403).json({
        error: "Forbidden access, this menu is not yours",
      });
    }

    const bucketName = "jajanjalan-storage";
    let imageUrl = null;

    if (image) {
      const fileName = `menu-${Date.now()}${path.extname(image.originalname)}`;
      const file = storage.bucket(bucketName).file(`images/menu/${fileName}`);

      const fileStream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      fileStream.on("error", (err) => {
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Failed to upload image" });
      });

      fileStream.on("finish", async () => {
        imageUrl = `https://storage.googleapis.com/${bucketName}/images/menu/${fileName}`;

        const menu = await prisma.menu.update({
          where: {
            id: menuId,
          },
          data: {
            item,
            price: parseInt(price),
            description,
            image: imageUrl,
          },
        });

        res.status(201).json({
          status: "success",
          data: {
            menu,
          },
        });
      });

      fileStream.end(image.buffer);
    } else {
      const menu = await prisma.menu.update({
        where: {
          id: menuId,
        },
        data: {
          item,
          price: parseInt(price),
          description,
        },
      });

      res.status(201).json({
        status: "success",
        data: {
          menu,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = updateMenu;
