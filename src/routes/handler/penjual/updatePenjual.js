const prisma = require("../../../utils/db");
const path = require("path");
const storage = require("../../../utils/cloudStorage");

const updatePenjual = async (req, res) => {
  try {
    const { name, address, phone, lat, lon, isOpen, description } = req.body;
    const image = req.file;
    const userId = req.userData.id;
    const penjualId = parseInt(req.params.id);

    const penjual = await prisma.penjual.findUnique({
      where: {
        id: penjualId,
      },
    });

    if (!penjual) {
      return res.status(404).json({
        status: "error",
        message: "Penjual not found",
      });
    }

    if (penjual.userId !== userId) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden access, you are not the owner of this penjual",
      });
    }

    const bucketName = "jajanjalan-storage";
    let imageUrl = null;

    if (image) {
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
        imageUrl = `https://storage.googleapis.com/${bucketName}/images/penjual/${fileName}`;

        const penjual = await prisma.penjual.update({
          where: {
            id: penjualId,
          },
          data: {
            name,
            address,
            phone,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            isOpen: isOpen === "true" ? true : false,
            description,
            image: imageUrl,
          },
        });

        res.status(200).json({
          status: "success",
          data: {
            penjual: {
              id: penjual.id,
              name: penjual.name,
              address: penjual.address,
              phone: penjual.phone,
              lat: penjual.lat,
              lon: penjual.lon,
              isOpen: penjual.isOpen,
              description: penjual.description,
              image: penjual.image,
            },
          },
        });
      });

      fileStream.end(image.buffer);
    } else {
      const penjual = await prisma.penjual.update({
        where: {
          id: penjualId,
        },
        data: {
          name,
          address,
          phone,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          isOpen: isOpen === "true" ? true : false,
          description,
        },
      });

      res.status(200).json({
        status: "success",
        data: {
          penjual: {
            id: penjual.id,
            name: penjual.name,
            address: penjual.address,
            phone: penjual.phone,
            lat: penjual.lat,
            lon: penjual.lon,
            isOpen: penjual.isOpen,
            description: penjual.description,
            image: penjual.image,
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = updatePenjual;
