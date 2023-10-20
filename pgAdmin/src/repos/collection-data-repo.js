const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");

class CollectionRepo {
    static async find() {
      const { rows } = await pool.query("SELECT * FROM collectiondata;");
  
      return toCamelCase(rows);
    }
}
module.exports = CollectionRepo