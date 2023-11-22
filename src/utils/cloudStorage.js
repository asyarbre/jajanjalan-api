const { Storage } = require("@google-cloud/storage");
const path = require("path");

const storage = new Storage({
  projectId: "jajanjalan-server",
  keyFilename: path.join(__dirname, "./jajanjalan-server-4c867ca0f164.json"),
});

module.exports = storage;