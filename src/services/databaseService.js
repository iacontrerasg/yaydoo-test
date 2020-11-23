const sqlite3 = require("sqlite3").verbose();
const sqlite = require("aa-sqlite");
let db = new sqlite3.Database("products");

const saveProducts = (array) => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS productos (
        "rank"	INTEGER,
        "name"	TEXT,
        "coverImage"	TEXT,
        "brandAuthor"	TEXT,
        "price"	TEXT,
        "rating_total"	TEXT,
        "rating_value"	NUMERIC,
        "category"	TEXT
    )`);

    db.run(`DELETE FROM productos`);

    const stmt = db.prepare("INSERT INTO productos VALUES (?,?,?,?,?,?,?,?)");

    for (let i = 0; i < array.length; i++) {
      stmt.run(
        array[parseInt(i)].rank,
        array[parseInt(i)].name,
        array[parseInt(i)].coverImage,
        array[parseInt(i)].brandAuthor,
        array[parseInt(i)].price,
        array[parseInt(i)].rating_total,
        array[parseInt(i)].rating_value,
        array[parseInt(i)].category
      );
    }

    stmt.finalize();
  });
};

const getCategories = async () => {
  await sqlite.open("./products");
  let sql = "SELECT DISTINCT category FROM productos";
  let r = await sqlite.all(sql, []);
  let categories = [];
  r.forEach((item) => {
    categories.push(item.category);
  });

  return categories;
};

const getCategoryByName = async (category) => {
  await sqlite.open("./products");
  let sql = `SELECT DISTINCT category FROM productos WHERE category =?`;
  let r = await sqlite.all(sql, [category]);

  return r;
};

const getAllProducts = async () => {
  await sqlite.open("./products");
  let sql = "SELECT * FROM productos";
  let r = await sqlite.all(sql, []);
  return r;
};

const getProductsByCategory = async (category) => {
  await sqlite.open("./products");
  let sql = "SELECT * FROM productos WHERE category=?";
  let r = await sqlite.all(sql, [category]);
  return r;
};

module.exports.saveProducts = saveProducts;
module.exports.getCategories = getCategories;
module.exports.getAllProducts = getAllProducts;
module.exports.getProductsByCategory = getProductsByCategory;
module.exports.getCategoryByName = getCategoryByName;
