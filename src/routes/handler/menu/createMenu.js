const path = require("path");
const prisma = require("../../../utils/db");
const storage = require("../../../utils/cloudStorage");

// Create menu handler
const createMenu = async (req, res) => {
  try {
    // Extract data from request body
    const { item, price, description } = req.body;
    const image = req.file;
    const userId = req.userData.id;

    //find penjual id
    const penjualId = await prisma.penjual.findUnique({
      where: {
        userId,
      },
    });
    
    // Upload image to Google Cloud Storage
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
      // Get the public URL of the uploaded image
      const imageUrl = `https://storage.googleapis.com/${bucketName}/images/${fileName}`;

      // TODO: Save menu data to database
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
