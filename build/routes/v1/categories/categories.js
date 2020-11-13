"use strict";

const router = require("express").Router();
const {
  getCategoriesController
} = require("../../../controllers/categories-controller");

router.get("/", getCategoriesController);

module.exports = router;