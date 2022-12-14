const mongoose = require("mongoose");
const { schemaOptions } = require("./modeloption");
console.log('schemaOptions',schemaOptions)
const todosSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
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
