const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  inputDate: { type: Date, required: true }
})

module.exports = mongoose.model("Log", logSchema);