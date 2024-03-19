const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "User" }, // Foreign key for user
    name: { type: String, required: true },
    deviceId: { type: String, unique: true, required: true }, // ID for the GPS device
    vehicleIdentifier: { type: String, unique: true, required: true },
    model: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
