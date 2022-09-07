const mongoose = require("mongoose");
const { schemaOptions } = require("./modeloption");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    role: {
      type: String,
      require: true,
      default: "user",
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    dayOfBirth: { type: String },
    token: { type: String },
  },
  schemaOptions
);
module.exports = mongoose.model("users", userSchema);
