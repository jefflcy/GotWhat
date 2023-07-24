const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const bizSchema = new mongoose.Schema({
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
  operatingHours: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  menuUrl: {
    type: String,
  },
  bannerUrl: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  role: {
    type: String,
  },
});

bizSchema.pre("save", async function (next) {
  next();
});

module.exports = mongoose.model("Business Owners", bizSchema);
