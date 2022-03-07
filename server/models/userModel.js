const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ROLE, DATA_STATUS } = require("./../config/string_constants");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your full name"],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
    },
   password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function(el) {
          return el === this.password;
        },
        message: "Password and confirm password are not same",
      },
    },
    role: {
      type: String,
      required: [true, "Please provide user type"],
      enum: ROLE,
      uppercase: true,
    },
    status: {
      type: String,
      default: DATA_STATUS.ACTIVE,
    },
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre(/^find/, function(next) {
  this.find({ dataStatus: { $ne: false } });
  next();
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};
userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changeTimestamp;
  }
  return false;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
