const app = require("./src/app.js");
const pool = require("./src/pool.js");

pool
  .connect({
    host: "ldpg-ckpno7o5vl2c73bprha0-a.oregon-postgres.render.com",
    port: 5432,
    database: "offshoot",
    user: "offshoot_user",
    password: "FCkWmYk9ntv2DoyffsdYfiXQEoGMGeZb",
    ssl:true
  })
  .then(() => {
    app().listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
