const {
  getCategories,
  getCategoryByName,
} = require("../services/databaseService");

const getCategoriesController = async (req, res) => {
  try {
    let categories = await getCategories();
    res.send(categories);
  } catch (e) {
    console.log("TODO: Error Handler", e);
    res.sendStatus(500);
  }
};

const getCategoriesByNameController = async (req, res) => {
  const { category } = req.params;
  try {
    let categories = await getCategoryByName(category);
    res.send(categories);
  } catch (e) {
    console.log("TODO: Error Handler", e);
    res.sendStatus(500);
  }
};
module.exports.getCategoriesController = getCategoriesController;
module.exports.getCategoriesByNameController = getCategoriesByNameController;
