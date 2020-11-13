const scrapeIt = require("scrape-it");
const moment = require("moment");

const url = "https://www.amazon.com.mx/gp/bestsellers/?ref_=nav_cs_bestsellers";

let categories = [];

const getCategories = async () => {
  try {
    const scrapeResult = await scrapeIt(url, {
      category: {
        listItem: "#zg_browseRoot ul li",
        data: {
          categoryID: {
            selector: "a",
            attr: "href",
            convert: (x) => x.substring(41, x.indexOf("/", 41)),
          },
          displayName: "a",
        },
      },
    });
    return scrapeResult.data;
  } catch (e) {
    console.log("TODO: Custom Error Handling");
  }
};

const getBestSellersPerCategory = async (categoryID) => {
  try {
    const pagesToFetch = 2;
    let url = `https://www.amazon.com.mx/gp/bestsellers/${categoryID}/ref=zg_bs_pg_2?ie=UTF8&pg=`;
    const bsPerCatogory = [];

    for (let i = 1; i <= pagesToFetch; i++) {
      const scrapeResult = await scrapeIt(url + i, {
        products: {
          listItem: "#zg-ordered-list li",
          data: {
            rank: {
              selector: ".a-size-small > span",
              how: "html",
              convert: (x) => x.substring(1, 4),
            },
            name: {
              selector: "img",
              attr: "alt",
            },
            coverImage: {
              selector: "img",
              attr: "src",
            },
            brandAuthor: {
              selector: ".a-size-small.a-color-base",
              how: "html",
            },
            price: {
              selector: ".p13n-sc-price",
              how: "html",
            },
            rating_total: {
              selector: ".a-size-small.a-link-normal",
              how: "html",
            },
            rating_value: {
              selector: ".a-icon-alt",
              how: "html",
              convert: (x) => (x === null ? null : x.substring(0, 3)),
            },
          },
        },
      });

      scrapeResult.data.products.forEach((item) => {
        item.category = categoryID;
        bsPerCatogory.push(item);
      });
    }

    return bsPerCatogory;
  } catch (e) {
    console.log("TODO: Custom Error Handling");
  }
};

const scrapeAmazon = async () => {
  try {
    const startTime = moment().format("HH:mm:ss");
    console.log(`Start scrape Amazon Best Sellers at ${startTime}`);
    const fetchedCategories = await getCategories();
    categories = fetchedCategories.category;
    let products = [];

    for (let i = 0; i <= categories.length - 1; i++) {
      let fetchedProducts = await getBestSellersPerCategory(
        categories[parseInt(i)].categoryID
      );

      for (let i = 0; i <= fetchedProducts.length - 1; i++) {
        products.push(fetchedProducts[parseInt(i)]);
      }
    }
    const finishTime = moment().format("HH:mm:ss");
    const dur = moment.duration(
      moment(finishTime, "HH:mm:ss") - moment(startTime, "HH:mm:ss")
    );
    console.log(
      `Finish scrape Amazon Best Sellers at ${finishTime}. Elapsed Time: ${dur.minutes()}:${dur.seconds()}`
    );
    return products;
  } catch (e) {
    console.log("TODO: Custom Error Handling");
  }
};

module.exports.scrapeAmazon = scrapeAmazon;
