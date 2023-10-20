
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: String,
  otpExpiration: Date,
});


UserSchema.pre(
    'save',
    async function(next) {


      
      const user = this;

      if(this.otp){

      const hash = await bcrypt.hash(this.password, 10);
      // const hashedOtp=await bcrypt.hash(this.otp, 10);
  
      this.password = hash;
      // this.otp=hashedOtp 
      next();}
      else {
        const hash = await bcrypt.hash(this.password, 10);
          this.password = hash;
      }
    }
  );
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};
UserSchema.method.isValidOtp= async function (otp) {
  const user = this;
  const compare = await bcrypt.compare(otp, user.otp);

  return compare;
};
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
