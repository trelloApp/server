const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-errors");
const UserController = {
  login: async (data) => {
    console.log("data", data);
    const getUser = await User.find({ username: data.username });
    if (getUser) {
      const checkPassword = await bcrypt.compare(
        data.password,
        getUser[0].password
      );
      console.log("checkPassword", checkPassword);
      if (checkPassword) {
      } else {
        throw new ApolloError({
          errorCode: 400,
          errorMessage: "password wrong",
        });
      }
    } else {
      throw new ApolloError({
        errorCode: 404,
        errorMessage: "user not found",
      });
    }
  },
  signIn: async (data) => {
    console.log("data signIn", data);
    const getUser = await User.find({ username: data.username });
    console.log("getUser", getUser);
    if (getUser.length === 0) {
      const newPassword = await bcrypt.hash(data.password, 10);
      const newData = {
        ...data,
        password: newPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = jwt.sign(
        {
          user_id: newData._id,
          username: newData.username,
        },
        "UNSAFE_STRING",
        { expiresIn: "2h" }
      );
      newData.token = token;
      const create = new User(newData);
      console.log("newdata", create);
      return await create.save();
    } else {
      throw new ApolloError({
        errorCode: 400,
        errorMessage: "user name already",
      });
    }
  },
  getAllUser: async () => await User.find(),
  getUserById: async (id) => await User.findById(id),
  updateUser: async (id, ...data) => {
    return await User.findByIdAndUpdate(id, {
      ...data,
      updatedAt: new Date(),
    });
  },
};
module.exports = UserController;
