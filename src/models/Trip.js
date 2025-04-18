const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./User");

const Trip = sequelize.define("Trip", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM("planned", "ongoing", "completed", "cancelled"),
    defaultValue: "planned",
  },
  cover_img: { type: DataTypes.STRING, allowNull: true },
});

Trip.belongsTo(User);
User.hasMany(Trip);

module.exports = Trip;