const prisma = require("../../../utils/db");
const bcrypt = require("bcrypt");
const path = require("path");
const storage = require("../../../utils/cloudStorage");

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body;
    const image = req.file;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const bucketName = "jajanjalan-storage";
    const fileName = `profile-${Date.now()}${path.extname(image.originalname)}`;
    const file = storage.bucket(bucketName).file(`images/profile/${fileName}`);

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
      const imageUrl = `https://storage.googleapis.com/${bucketName}/images/profile/${fileName}`;

      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          password: hashedPassword,
          image: imageUrl,
        },
      });

      res.json({
        message: "User updated successfully",
        data: user,
      });
    });

    fileStream.end(image.buffer);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

module.exports = update;
