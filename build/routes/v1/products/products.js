"use strict";

const router = require("express").Router();

const {
  getAllProductsController,
  getProductsByCategoryController,
  reloadAllProducts
} = require("../../../controllers/products-controller");

router.get("/", getAllProductsController);

router.get("/:category", getProductsByCategoryController);

router.post("/reload", reloadAllProducts);

module.exports = router;