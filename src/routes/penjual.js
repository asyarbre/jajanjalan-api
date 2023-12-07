const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const permission = require("../middlewares/permission");
const createPenjual = require("./handler/penjual/createPenjual");
const getByPenjualId = require("./handler/penjual/getByPenjualId");
const deletePenjual = require("./handler/penjual/deletePenjual");
const getAllPenjual = require("./handler/penjual/getAllPenjual");
const updatePenjual = require("./handler/penjual/updatePenjual");
const router = express.Router();

router.get("/", getAllPenjual);
router.post("/create", verifyToken, permission('penjual'), createPenjual);
router.get("/:id", getByPenjualId);
router.patch("/:id", verifyToken, permission('penjual'), updatePenjual);
router.delete("/:id", verifyToken, permission('penjual'), deletePenjual);

module.exports = router;