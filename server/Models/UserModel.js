const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Your email address is required"],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Your password is required"],
  },
  name: {
    type: String,
    trim: true,
    default: "",
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  next();
});

module.exports = mongoose.model("User", userSchema);
