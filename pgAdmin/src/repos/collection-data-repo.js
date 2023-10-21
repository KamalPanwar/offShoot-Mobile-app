const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");

class CollectionRepo {
    static async find() {
      const { rows } = await pool.query("SELECT * FROM colecdata;");
  
      return toCamelCase(rows);
    }

    static async update(collectionid, lllocation, latlong) {
      const { rows } = await pool.query(
        "UPDATE colecdata SET latlong=$1 ,lllocation=$2 where collectionid=$3 RETURNING *"
      ,[latlong, lllocation,collectionid] );
  
      
      return toCamelCase(rows)
    }
}
module.exports = CollectionRepo