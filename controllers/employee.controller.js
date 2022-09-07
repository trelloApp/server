const { Employee } = require("../model/index");
const EmployeeController = {
  getAllEmployees: async () => await Employee.find(),
  getEmployeeById: async (id) => await Employee.findById(id),
  createEmployee: async (data) => {
    const newData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 1,
    };
    const newSave = new Employee(newData);
    return await newSave.save();
  },
  updateEmployee: async ({ id, ...data }) =>
    await Employee.findOneAndUpdate(id, { ...data, updatedAt: new Date() }),
  deleteEmployee: async (id) => await Employee.deleteOne({ _id: id }),
};
module.exports = EmployeeController;
