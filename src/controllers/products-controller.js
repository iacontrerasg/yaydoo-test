const {
  getAllProducts,
  getProductsByCategory,
  getCategories,
  saveProducts,
} = require("../services/databaseService");

const { scrapeAmazon } = require("../services/scraperService");

const getAllProductsController = async (req, res) => {
  try {
    let categories = await getCategories();
    let products = await getAllProducts();

    let response = [];

    for (let i in categories) {
      let currentCategory = categories[parseInt(i)];
      let filterProducts = products.filter((x) => {
        return x.category === currentCategory;
      });

      let formattedProducts = [];
      for (let i in filterProducts) {
        let obj = {
          rank: filterProducts[parseInt(i)].rank,
          name: filterProducts[parseInt(i)].name,
          coverImage: filterProducts[parseInt(i)].coverImage,
          brandAuthor: filterProducts[parseInt(i)].brandAuthor,
          price: filterProducts[parseInt(i)].price,
          rating: {
            total: filterProducts[parseInt(i)].rating_total,
            value: filterProducts[parseInt(i)].rating_value,
          },
        };
        formattedProducts.push(obj);
      }

      let obj = {
        category: currentCategory,
        products: formattedProducts,
      };

      response.push(obj);
    }

    res.send(response);
  } catch (e) {
    res.statusCode(500).send("ooops! Algo salió mal! :(");
  }
};

const getProductsByCategoryController = async (req, res) => {
  try {
    let products = await getProductsByCategory(req.params.category);

    let response = [];

    let formattedProducts = [];
    for (let i in products) {
      let obj = {
        rank: products[parseInt(i)].rank,
        name: products[parseInt(i)].name,
        coverImage: products[parseInt(i)].coverImage,
        brandAuthor: products[parseInt(i)].brandAuthor,
        price: products[parseInt(i)].price,
        rating: {
          total: products[parseInt(i)].rating_total,
          value: products[parseInt(i)].rating_value,
        },
      };
      formattedProducts.push(obj);
    }

    let obj = {
      category: req.params.category,
      products: formattedProducts,
    };
    response.push(obj);

    if (response.products === undefined) {
      res
        .status(400)
        .send({
          error: true,
          msg: "La categoría no contiene productos o no existe",
        });
    } else {
      res.send(response);
    }
  } catch (e) {
    res.statusCode(500).send("ooops! Algo salió mal! :(");
  }
};

const reloadAllProducts = async (req, res) => {
  try {
    const productos = await scrapeAmazon();
    saveProducts(productos);
    let categories = await getCategories();
    res.send(categories);
  } catch (e) {
    console.log("TODO: Custom Error Handling", e);
    res.statusCode(500).send("ooops! Algo salió mal! :(");
  }
};

module.exports.getAllProductsController = getAllProductsController;
module.exports.getProductsByCategoryController = getProductsByCategoryController;
module.exports.reloadAllProducts = reloadAllProducts;
