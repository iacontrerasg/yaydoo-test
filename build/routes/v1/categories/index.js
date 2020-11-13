"use strict";

const router = require("express").Router();

router.use("/", require("./categories"));

module.exports = router;