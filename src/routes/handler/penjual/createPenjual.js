const path = require("path");
const prisma = require("../../../utils/db");
const { validatePenjual } = require("../../../validations/penjual.validation");
const storage = require("../../../utils/cloudStorage");

const createPenjual = async (req, res) => {
  try {
    const { name, address, phone, lat, lon, description } = req.body;
    const image = req.file;
    const userId = req.userData.id;

    const checkPenjual = await prisma.penjual.findUnique({
      where: {
        userId,
      },
    });
    if (checkPenjual) {
      return res.status(400).json({
        status: "error",
        message: "Penjual already exists",
      });
    }

    const { error } = validatePenjual(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    const bucketName = "jajanjalan-storage";
    const fileName = `penjual-${Date.now()}${path.extname(image.originalname)}`;
    const file = storage.bucket(bucketName).file(`images/penjual/${fileName}`);

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
      const imageUrl = `https://storage.googleapis.com/${bucketName}/images/penjual/${fileName}`;

      const penjual = await prisma.penjual.create({
        data: {
          name,
          address,
          phone,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          description,
          image: imageUrl,
          userId,
        },
      });

      res.status(201).json({
        status: "success",
        data: {
          penjual,
        },
      });
    });

    fileStream.end(image.buffer);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = createPenjual;
