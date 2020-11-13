"use strict";

const router = require("express").Router();

router.use("/products", require("./products"));
router.use("/categories", require("./categories"));

module.exports = router;