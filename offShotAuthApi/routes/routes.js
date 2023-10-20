const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const UserModel=require('../model/model')
const speakeasy = require('speakeasy');
const sendEmail=require('../utils/Email')

const router = express.Router();
const secret = speakeasy.generateSecret();

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
router.get('/',async(req,res)=>{
   const data= await UserModel.find()
   res.send(data)
})

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {

    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random 6-digit OTP
    const otp =speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32'
  });
    user.otp = otp;
    user.otpExpiration = Date.now() + 300000; // OTP expires in 5 minutes
    await user.save();

    const message =`OTP for your forgot Password ${otp}`

    // Send the OTP to the user's email or phone number
    await sendEmail({
      email:user.email,
      subject:'Your password reset OTP(valid for 5 min)',
      message
    })

    // Implement this part based on your chosen communication method

    res.status(200).json({ message: "OTP has been sent to your email or phone" });
  } catch (error) {
    next(error);
  }
});


router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;


    const user = await UserModel.findOne({
      email,
      otp,
      otpExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    // Update the password and clear the OTP fields
    user.password = password;
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save({validateBeforeSave:false});

    // You might also want to notify the user that their password has been changed

    res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
