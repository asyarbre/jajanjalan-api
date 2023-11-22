const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const permission = require("../../middlewares/permission");
const createPenjual = require("./penjual/createPenjual");
const router = express.Router();

router.post("/create", verifyToken, permission('penjual'), createPenjual);

module.exports = router;