const router = require("express").Router();

router.use("/", require("./products"));

module.exports = router;
