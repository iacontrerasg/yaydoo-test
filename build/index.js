"use strict";

const express = require("express");
//const { scrapeAmazon } = require("./services/scraperService");
//const { saveProducts } = require("./services/databaseService");

const app = express();
const PORT = process.env.PORT || 8082;

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