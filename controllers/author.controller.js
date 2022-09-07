const { Author } = require("../model/index");
const AuthorController = {
  getAllAuthors: async () => await Author.find(),
  getAuthorById: async (id) => await Author.findById(id),
  createAuthor: async (data) => {
    const newData = { ...data, createdAt: new Date(), updatedAt: new Date() };
    const newSave = new Author(newData);
    return await newSave.save();
  },
  updateAuthor: async ({ id, ...data }) =>
    await Author.findOneAndUpdate(id, { ...data, updatedAt: new Date() }),
  deleteAuthor: async (id) => await Author.deleteOne({ _id: id }),
};
module.exports = AuthorController;
