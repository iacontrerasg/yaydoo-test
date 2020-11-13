"use strict";

const { getCategories } = require("../services/databaseService");

const getCategoriesController = async (req, res) => {
  try {
    let categories = await getCategories();
    res.send(categories);
  } catch (e) {
    console.log("TODO: Error Handler", e);
    res.sendStatus(500);
  }
};

module.exports.getCategoriesController = getCategoriesController;