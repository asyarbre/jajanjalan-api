const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const permission = require("../../middlewares/permission");
const createPenjual = require("./penjual/createPenjual");
const getByPenjualId = require("./penjual/getByPenjualId");
const deletePenjual = require("./penjual/deletePenjual");
const router = express.Router();

router.post("/create", verifyToken, permission('penjual'), createPenjual);
router.get("/:id", getByPenjualId);
router.delete("/:id", verifyToken, permission('penjual'), deletePenjual);

module.exports = router;