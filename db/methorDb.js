const TodoController = require("../controllers/todos.controller");
const AuthController = require("../controllers/author.controller");
const EmployeeController = require("../controllers/employee.controller");
const UserController = require("../controllers/user.controller");
const { ListTodos } = require("../controllers/index");

const dbMethors = {
  ...TodoController,
  ...AuthController,
  ...EmployeeController,
  ...UserController,
  ...ListTodos,
};
module.exports = dbMethors;
