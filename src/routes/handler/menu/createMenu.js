const path = require("path");
const prisma = require("../../../utils/db");
const storage = require("../../../utils/cloudStorage");

const createMenu = async (req, res) => {
  try {
    const { item, price, description } = req.body;
    const image = req.file;
    const userId = req.userData.id;

    const penjualId = await prisma.penjual.findUnique({
      where: {
        userId,
      },
    });
    
    const bucketName = "jajanjalan-storage";
    const fileName = `${Date.now()}_${path.basename(image.originalname)}`;
    const file = storage.bucket(bucketName).file(`images/${fileName}`);

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
      const imageUrl = `https://storage.googleapis.com/${bucketName}/images/${fileName}`;

      const menu = await prisma.menu.create({
        data: {
          penjualId: penjualId.id,
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
  } catch (err) {
    console.error("Error creating menu:", err);
    res.status(500).json({ error: "Failed to create menu" });
  }
};

module.exports = createMenu;
