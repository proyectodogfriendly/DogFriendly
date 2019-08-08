const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    surname: String,
    email: String,
    password: String,
    nameDog: String,
    ageDog: Number,
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
