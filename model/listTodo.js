const mongoose = require("mongoose");
const { schemaOptions } = require("./modeloption");
const listTodos = new mongoose.Schema(
  {
    name: {
      type: "String",
    },
    list: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "list",
      default: [],
    },
  },
  schemaOptions
);
module.exports = mongoose.model("listTodo", listTodos);
