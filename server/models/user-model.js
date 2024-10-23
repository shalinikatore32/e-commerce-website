const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createModel = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  }
});

// This method is used to bcrypt the password
createModel.pre("save", async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(user.password, saltRound);
    user.password = hash_pass;
  } catch (err) {
    console.log(err);
  }
  next();
});

// This method is called in router.js file and returns the bcrypt password comparison
createModel.methods.comparePass = async function (password) {
  return await bcrypt.compare(password, this.password);
}

// This method is used to generate the JWT Token
createModel.methods.generateToken = async function () {
  try {
    return jwt.sign({
      // Payload
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    // Signature
    process.env.SECRET_KEY,
    {
      expiresIn: '30d'
    })  // SECRET_KEY is accessed from the .env file
  } catch (err) {
    console.log(err);
  }
}

// Method to generate reset password token
createModel.methods.generatePasswordReset = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash the reset token before saving to the database
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  return resetToken;
};

// Method to verify the reset password token
createModel.methods.verifyPasswordReset = function (token) {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  return (hashedToken === this.resetPasswordToken && this.resetPasswordExpires > Date.now());
};

const userRegister = mongoose.model("User", createModel);

module.exports = userRegister;
