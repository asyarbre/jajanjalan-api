const prisma = require("../../../utils/db");
const bcrypt = require("bcrypt");
const path = require("path");
const storage = require("../../../utils/cloudStorage");

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body;
    const image = req.file;
    const userIdFromToken = req.userData.id;

    // Check if the password is provided
    if (!password) {
      return res.status(400).json({
        error: "Password is required",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const bucketName = "jajanjalan-storage";
    let imageUrl = null;

    // Check if the userId in the param is the same as the userId in the token
    if (userIdFromToken != userId) {
      return res.status(403).json({
        error: "Forbidden access",
      });
    }

    if (image) {
      const fileName = `profile-${Date.now()}${path.extname(
        image.originalname
      )}`;
      const file = storage
        .bucket(bucketName)
        .file(`images/profile/${fileName}`);

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
        imageUrl = `https://storage.googleapis.com/${bucketName}/images/profile/${fileName}`;

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
    } else {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          password: hashedPassword,
        },
      });

      res.json({
        message: "User updated successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error);
  }
};

module.exports = update;
