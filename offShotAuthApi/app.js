const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

const UserModel = require("./model/model");

const cors = require("cors");

require("./auth/auth");

const routes = require("./routes/routes");
const secureRoute = require("./routes/secure-routes");

const app = express();

app.use(express.json());
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/", routes);

mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/passport-jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is connected"));
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log("Server started is running on port 3000");
});
