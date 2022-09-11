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
  updateTodo: async ({ id, ...data }) => {
    console.log(data, id);
    const getTodoUpdate = await Todo.findById(id);
    await Todo.findOneAndUpdate(
      { _id: id },
      {
        ...getTodoUpdate._doc,
        ...data,
        updatedAt: Date.now(),
      }
    );
    return await Todo.findById(id);
  },

  deleteTodo: async (data) => {
    const { id, listId } = data;
    const getListTodo = await ListTodos.findById(listId);
    const getnewListAsync = new Promise((resolve, reject) => {
      let newList = [];
      getListTodo.list.forEach(async (l, i) => {
        const newL = await l;
        console.log(newL.toHexString());
        if (newL.toHexString() !== id) {
          newList.push(newL.toHexString());
        }
        if (i === getListTodo.list.length - 1) resolve(newList);
      });
    });
    getnewListAsync
      .then(async (result) => {
        await ListTodos.findOneAndUpdate(
          { _id: listId },
          { ...getListTodo._doc, list: result }
        );
        const getTodo = await Todo.findById(id);
        await Todo.deleteOne({ _id: id });
        return getTodo;
      })
      .catch((err) => {
        throw new ApolloError(err);
      });
  },
  updateDroppable: async (data) => {
    const { id, currentListId, listId, index } = data;
    const arrListId = [listId, currentListId];
    const currentList = await ListTodos.findById({ _id: currentListId });
    const list = await ListTodos.findById({ _id: listId });
    const arrdata = [list, currentList];
    const updateAsync = new Promise((resolve, reject) => {
      let newCurrentList = [];
      let newList = list.list;
      currentList.list.forEach(async (listId, i) => {
        const insert = (arr, index, newItem) => [
          ...arr.slice(0, index),
          newItem,
          ...arr.slice(index),
        ];
        const formatId = await listId;
        if (formatId.toHexString() != id) {
          newCurrentList.push(formatId.toHexString());
        }
        if (i === currentList.list.length - 1) {
          newList = insert(newList, index, id);
          resolve({ newCurrentList, newList });
        }
      });
    });
    updateAsync
      .then(async (data2) => {
        const { newCurrentList, newList } = data2;
        const arrListUpdate = [newList, newCurrentList];
        const returnAsync = new Promise((resolve, reject) => {
          arrListId.forEach(async (lId, i) => {
            await ListTodos.findOneAndUpdate(
              { _id: lId },
              { ...arrdata[i]._doc, list: arrListUpdate[i] }
            );
            if (i === 1) resolve(true);
          });
        });
        returnAsync.then(async (d) => {
          console.log("data", data);
          return await data;
        });
      })
      .catch((err) => {
        throw new ApolloError(err);
      });
  },
};
module.exports = TodoController;
