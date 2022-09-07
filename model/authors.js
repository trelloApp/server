const mongoose = require("mongoose");
const { schemaOptions } = require("./modeloption");
const authorSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      require: true,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("author", authorSchema);
