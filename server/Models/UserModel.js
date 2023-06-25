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
  role: {
    type: String,
    required: true,
    enum: ["user", "business"],
  },
  operatingHours: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  menu: {
    type: Buffer,
    contentType: String,
  },
  banner: {
    type: Buffer,
    contentType: String,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
