const mongoose = require("mongoose");
const { schemaOptions } = require("./modeloption");
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    name: {
      type: "string",
      require: true,
    },
    status: {
      type: "Number",
      default: 0,
    },
  },
  schemaOptions
);
module.exports = mongoose.model("employee", employeeSchema);
