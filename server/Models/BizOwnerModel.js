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
  avatar: {
    type: Buffer,
    contentType: String,
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
  role: {
    type: String,
  },
});

bizSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Business Owners", bizSchema);
