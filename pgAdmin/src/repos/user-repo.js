const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");

class UserRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM users;");

    return toCamelCase(rows);
  }
  static async findByID(username) {
    // WARNING :REALLY BIG SECURITY ISSUE!
    const { rows } = await pool.query(
      `
    SELECT*FROM users WHERE username=$1`,
      [username]
    );

    return toCamelCase(rows)[0];  
  }
  static async insert(username, password) {
    const { rows } = await pool.query(
      "INSERT INTO users (username,password) VALUES($1,$2) RETURNING *",
      [username, password]
    );
    return toCamelCase(rows);
  }
  static async update(id, username, bio) {
    const { rows } = await pool.query(
      "UPDATE users SET username=$1 ,bio=$2 where id=$3 RETURNING *"
    ,[username,bio,id] );

    
    return toCamelCase(rows)
  }
  static async delete(id) {
      const {rows}=await pool.query('DELETE FROM users WHERE id=$1 RETURNING *;',[id])
      return toCamelCase(rows)[0]; 
  }
}
module.exports = UserRepo;
