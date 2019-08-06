const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const areaSchema = new Schema(
  {
    district: String,
    address: String,
    position: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

areaSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Area", areaSchema);
