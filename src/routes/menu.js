const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const permission = require("../middlewares/permission");
const createMenu = require("./handler/menu/createMenu");

router.post("/create", verifyToken, permission('penjual'), createMenu);

module.exports = router;
