const mongoose = require("mongoose");
const { schemaOptions } = require("./modeloption");
const todosSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
    },
    employeeId: {
      type: String,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("Todo", todosSchema);