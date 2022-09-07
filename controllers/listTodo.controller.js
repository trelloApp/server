const { ListTodos, Todo } = require("../model/index");
const { ApolloError } = require("apollo-server-errors");
const ListTodosController = {
  listTodos: async () => await ListTodos.find(),
  listTodo: async (id) => await ListTodos.findById(id),
  createListTodo: async (data) => {
    const getList = await ListTodos.find({ name: data.name });
    console.log("getList", getList);
    if (getList.length === 0) {
      return await new ListTodos(data).save();
    } else {
      throw new ApolloError("tab name already");
    }
  },
  updateListTodo: async (data) => {
    console.log("data", data);
  },
  deleteListTodo: async (id) => {
    const getListTodo = await ListTodos.findById(id);
    getListTodo.list.forEach(async (l) => {
      const object = await l;
      await Todo.deleteOne({ _id: object.toHexString() });
    });
    await ListTodos.deleteOne({ _id: id });
    return getListTodo;
  },
};
module.exports = ListTodosController;
