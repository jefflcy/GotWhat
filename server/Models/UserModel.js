const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "business"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
