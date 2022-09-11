const { gql } = require("apollo-server-express");
const typeDefs = gql`
  input UserInput {
    role: String
    username: String
    password: String
    dayOfBirth: String
    createdAt: String
    updatedAt: String
    token: String
  }
  input Login {
    username: String
    password: String
  }
  type DataDrag {
    currentId: String
    indexCurrentId: Int
    newId: String
    indexNewId: Int
    updatedAt: String
  }
  type User {
    id: ID!
    role: String
    username: String
    password: String
    dayOfBirth: String
    createdAt: String
    updatedAt: String
    token: String
  }
  type Todo {
    id: ID!
    todo: String!
    content: String
    createdAt: String
    updatedAt: String
    authorId: Author
    employeeId: Employee
  }
  type ListTodo {
    id: ID!
    name: String
    list: [String]
    createdAt: String
    updatedAt: String
  }
  type Author {
    id: ID!
    name: String!
    listCreate: [Todo]
    createdAt: String
    updatedAt: String
  }
  type Employee {
    id: ID!
    name: String!
    status: Int
    listTodos: [Todo]
    createdAt: String
    updatedAt: String
  }
  type Droppable {
    id: ID!
    currentListId: String
    listId: String
    index: Int
  }
  #ROOT TYPE

  type Query {
    users: [User]
    user(id: ID!): User
    todos: [Todo]
    listTodos: [ListTodo]
    listTodo(id: ID!): ListTodo
    todo(id: ID!): Todo
    authors: [Author]
    author(id: ID!): Author
    employees: [Employee]
    employee(id: ID!): Employee
  }
  type Mutation {
    login(username: String, password: String): User
    createUser(
      role: String
      username: String
      password: String
      dayOfBirth: String
      createdAt: String
      updatedAt: String
      token: String
    ): User
    createTodo(
      listID: String
      todo: String!
      content: String
      createdAt: String
      update_at: String
      authorID: ID
      employeeID: ID
    ): Todo
    createListTodo(name: String): ListTodo
    createAuthor(
      name: String!
      status: Int
      createdAt: String
      updatedAt: String
    ): Author
    createEmployee(
      name: String!
      status: Int
      createdAt: String
      updatedAt: String
    ): Employee
    updateUser(
      id: ID!
      role: String
      username: String
      password: String
      dayOfBirth: String
      createdAt: String
      updatedAt: String
    ): User
    updateTodo(
      id: ID!
      todo: String
      content: String
      createdAt: String
      updatedAt: String
      authorId: String
      employeeId: String
    ): Todo
    updateListTodo(
      currentId: String
      indexCurrentId: Int
      newId: String
      indexNewId: Int
    ): DataDrag
    updateAuthor(
      id: ID!
      name: String
      createdAt: String
      updatedAt: String
    ): Author
    updateEmployee(
      id: ID!
      name: String
      createdAt: String
      update_at: String
      status: Int
    ): Employee
    updateDroppable(
      id: ID!
      currentListId: String
      listId: String
      index: Int
    ): Droppable
    deleteTodo(id: ID!, listId: ID!): Todo
    deleteListTodo(id: ID!): ListTodo
    deleteAuthor(id: ID!): Author
    deleteEmployee(id: ID!): Employee
  }
`;
module.exports = typeDefs;
