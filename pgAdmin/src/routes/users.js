const express = require("express");
const UserRepo = require("../repos/user-repo");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const router = express.Router();

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

router.get("/users", async (req, res) => {
  const users = await UserRepo.find();
  if (users) {
    res.send(users);
  } else res.sendStatus(404);
});

router.post("/login", async (req, res) => {
  const { password} = req.body;
  const username=req.body.email
  console.log(req.body)
  const user = await UserRepo.findByID(username);

  if (user) {
    if(password==user.password){
    const body = { id: user.id, username: user.username };
    const token = jwt.sign({ user: body }, "TOP_SECRET");

    return res.json({ token })}
    else{
     res.json({status:'fail' ,data:'password is incorrect'})
    }
    
  } else {
    res.sendStatus(404);
  }
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await UserRepo.insert(username, password);
  res.send(user);
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;

  const { username, bio } = req.body;
  const user = await UserRepo.update(id, username, bio);

  if (user.length > 0) {
    res.send(user);
  } else res.sendStatus(404);
});

router.delete("/users/:id", async (req, res) => {
  console.log("====================================");
  console.log(req.params);
  console.log("====================================");
  const { id } = req.params;
  const user = await UserRepo.delete(id);
  if (user) {
    res.send(user);
  } else res.sendStatus(404);
});

module.exports = router;
