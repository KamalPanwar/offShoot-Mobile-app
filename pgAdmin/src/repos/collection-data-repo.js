const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");

class CollectionRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM colecdata;");

    return toCamelCase(rows);
  }

  static async update(
    collectionid,
    lllocation,
    latlong,
    contactpersonname,
    contactpersonno,
    paymentamount,
    paymentmode,
    uploaddate,
    fe_status
  ) {
    const { rows } = await pool.query(
      "UPDATE colecdata SET latlong=$1 ,lllocation=$2,contactpersonname=$3, contactpersonno=$4, paymentamount=$5,paymentmode=$6,uploaddate =$7,fe_status=$8 where collectionid=$9 RETURNING *",
      [
        latlong,
        lllocation,
        contactpersonname,
        contactpersonno,
        paymentamount,
        paymentmode,
        uploaddate,fe_status,
        collectionid,
      ]
    );

    return toCamelCase(rows);
  }
}
module.exports = CollectionRepo