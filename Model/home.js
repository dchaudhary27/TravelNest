const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  homeName: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  photo: {
    url: { type: String },
    publicId: { type: String },
  },
  houseRules: {
    url: { type: String },
    publicId: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Home", homeSchema);
