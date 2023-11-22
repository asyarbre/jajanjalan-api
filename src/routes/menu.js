const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const permission = require("../middlewares/permission");
const createMenu = require("./handler/menu/createMenu");
const getMenuById = require("./handler/menu/getMenuById");
const getMenuByPenjualId = require("./handler/menu/getMenuByPenjualId");
const deleteMenu = require("./handler/menu/deleteMenu");

router.post("/create", verifyToken, permission('penjual'), createMenu);
router.get("/:id", getMenuById);
router.get("/penjual/:id", getMenuByPenjualId);
router.delete("/:id", verifyToken, permission('penjual'), deleteMenu);

module.exports = router;
