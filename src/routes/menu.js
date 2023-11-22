const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const permission = require("../middlewares/permission");
const createMenu = require("./handler/menu/createMenu");
const getMenuById = require("./handler/menu/getMenuById");
const getMenuByPenjualId = require("./handler/menu/getMenuByPenjualId");

router.post("/create", verifyToken, permission('penjual'), createMenu);
router.get("/:id", getMenuById);
router.get("/penjual/:id", getMenuByPenjualId);


module.exports = router;
