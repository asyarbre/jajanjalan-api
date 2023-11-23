const { Storage } = require("@google-cloud/storage");
const serviceAccount = require("./serviceAccount");

const storage = new Storage({
  projectId: "jajanjalan-server",
  credentials: serviceAccount,
});

module.exports = storage;