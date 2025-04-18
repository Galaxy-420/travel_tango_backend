const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User");
const Tags = require("./Tags");

// Define the Expense model
const Expense = sequelize.define("Expense", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  tags: { type: DataTypes.STRING, allowNull: true },
  receipt_img: { type: DataTypes.STRING, allowNull: true },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
    allowNull: false,
  },
});

// Define associations
Expense.belongsTo(User);
User.hasMany(Expense);

Expense.belongsToMany(Tags, { through: "ExpenseTags" });
Tags.belongsToMany(Expense, { through: "ExpenseTags" });

module.exports = Expense;