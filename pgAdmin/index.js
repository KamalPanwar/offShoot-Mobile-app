const app = require("./src/app.js");
const pool = require("./src/pool.js");

pool
  .connect({
    host: "127.0.0.1",
    port: 5432,
    database: "offshoot",
    user: "postgres",
    password: "12345",
  })
  .then(() => {
    app().listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
