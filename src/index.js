const express = require("express");
const { scrapeAmazon } = require("./services/scraperService");
const { saveProducts } = require("./services/databaseService");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 8082;
const swaggerDocument = require("../swagger.json");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");

  next();
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, async () => {
  console.log(`Up & Running on port: ${PORT}`);
  try {
    //const productos = await scrapeAmazon();
    //saveProducts(productos);
  } catch (e) {
    console.log("TODO: Custom Error Handling", e);
  }
});

app.use("/v1", require("./routes/v1"));

module.exports = app;
module.exports.port = PORT;
