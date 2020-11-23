const router = require("express").Router();
const {
  getCategoriesController,
  getCategoriesByNameController,
} = require("../../../controllers/categories-controller");

router.get("/", getCategoriesController);
router.get("/:category", getCategoriesByNameController);

module.exports = router;
