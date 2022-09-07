const { Todo, ListTodos } = require("../model/index");
const { ApolloError } = require("apollo-server-errors");

const TodoController = {
  getAllTodos: async (condition = null) =>
    condition === null ? await Todo.find() : await Todo.find(condition),
  getTodoById: async (id) => await Todo.findById(id),
  createTodo: async (data) => {
    const check = await Todo.find({ todo: data.todo });
    if (check.length === 0) {
      const getListTodo = await ListTodos.findById(data.listID);
      const getTodo = await new Todo({ ...data }).save();
      const newList = [...getListTodo.list, getTodo.id];
      await ListTodos.findByIdAndUpdate(data.listID, { list: newList });
      return getTodo;
    } else {
      throw new ApolloError("todo already");
    }
  },
  updateTodo: async ({ id, ...data }) =>
    await Todo.findOneAndUpdate(id, { ...data, updatedAt: Date.now() }),
  deleteTodo: async (data) => {
    console.log("dataa", data);
    const { id, listId } = data;
    const getListTodo = await ListTodos.findById(listId);
    console.log("listTodo", getListTodo);

    const getnewListAsync = new Promise((resolve, reject) => {
      let newList = [];
      getListTodo.list.forEach(async (l, i) => {
        const newL = await l;
        if (newL.toHexString() !== id) {
          newList.push(newL.toHexString());
        }
        if (i === getListTodo.list.length - 1) resolve(newList);
      });
    });
    getnewListAsync
      .then(async (result) => {
        console.log("result", result);
        await ListTodos.findOneAndUpdate(listId, { list: [] });
        const getTodo = await Todo.findById(id);
        console.log("getTodo", getTodo);
        // await Todo.deleteOne({ _id: id });
        console.log(await ListTodos.findById(listId));
        // return getTodo;
      })
      .catch((err) => {
        throw new ApolloError(err);
      });

    // return await Todo.deleteOne({ _id: id });
  },
};
module.exports = TodoController;
