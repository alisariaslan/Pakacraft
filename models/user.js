const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, required: true },
  isInTheWhitelist: { type: Boolean, required: true },
  sysRegisterDate: { type: Date, required: true },
})

module.exports = mongoose.model("User", userSchema);