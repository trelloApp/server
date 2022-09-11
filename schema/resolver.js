const resolver = {
  Query: {
    users: async (parent, args, { dbMethors }) => await dbMethors.getAllUser(),
    user: async (parent, args, { dbMethors }) =>
      await dbMethors.getUserById(args.id),
    todos: async (parent, args, { dbMethors }) => await dbMethors.getAllTodos(),
    todo: async (parent, args, { dbMethors }) =>
      await dbMethors.getTodoById(args.id),
    listTodos: async (parent, args, { dbMethors }) =>
      await dbMethors.listTodos(),
    listTodo: async (parent, args, { dbMethors }) =>
      await dbMethors.listTodo(args.id),
    authors: async (parent, args, { dbMethors }) =>
      await dbMethors.getAllAuthors(),
    author: async (parent, args, { dbMethors }) =>
      await dbMethors.getAuthorById(args.id),
    employees: async (parent, args, { dbMethors }) =>
      await dbMethors.getAllEmployees(),
    employee: async (parent, args, { dbMethors }) =>
      await dbMethors.getEmployeeById(args.id),
  },
  Todo: {
    authorId: async (parent, args, { dbMethors }) =>
      await dbMethors.getAuthorById(parent.authorId),
    employeeId: async (parent, args, { dbMethors }) =>
      await dbMethors.getEmployeeById(parent.employeeId),
  },
  Author: {
    listCreate: async (parent, args, { dbMethors }) => {
      console.log("parent: ", parent, args);
      return await dbMethors.getAllTodos({ authorId: parent._id });
    },
  },
  Employee: {
    listTodos: async (parent, args, { dbMethors }) =>
      await dbMethors.getAllTodos({ employeeId: parent._id }),
  },
  Mutation: {
    login: async (parent, args, { dbMethors }) => await dbMethors.login(args),
    createUser: async (parent, args, { dbMethors }) =>
      await dbMethors.signIn(args),
    updateUser: async (parent, args, { dbMethors }) =>
      await dbMethors.updateUser(({ id, ...data } = args)),
    // listtodo
    createListTodo: async (parent, args, { dbMethors }) =>
      await dbMethors.createListTodo(args),
    updateListTodo: async (parent, args, { dbMethors }) =>
      await dbMethors.updateListTodo(args),
    deleteListTodo: async (parent, args, { dbMethors }) => {
      console.log("do");
      return await dbMethors.deleteListTodo(args.id);
    },
    // todo
    createTodo: async (parent, args, { dbMethors }) =>
      await dbMethors.createTodo(args),
    updateTodo: async (parent, args, { dbMethors }) =>
      await dbMethors.updateTodo(({ id, ...data } = args)),
    deleteTodo: async (parent, args, { dbMethors }) =>
      await dbMethors.deleteTodo(args),
    //authorized
    createAuthor: async (parent, args, { dbMethors }) =>
      await dbMethors.createAuthor(args),
    updateAuthor: async (parent, args, { dbMethors }) =>
      await dbMethors.updateAuthor(({ id, ...data } = args)),
    deleteAuthor: async (parent, args, { dbMethors }) =>
      await dbMethors.deleteAuthor(args.id),
    //employee
    createEmployee: async (parent, args, { dbMethors }) =>
      await dbMethors.createEmployee(args),
    updateEmployee: async (parent, args, { dbMethors }) =>
      await dbMethors.updateEmployee(({ id, ...data } = args)),
    deleteEmployee: async (parent, args, { dbMethors }) =>
      await dbMethors.deleteEmployee(args.id),
    //Droppable
    updateDroppable: async (parent, args, { dbMethors }) =>
      dbMethors.updateDroppable(args),
  },
};
module.exports = resolver;
