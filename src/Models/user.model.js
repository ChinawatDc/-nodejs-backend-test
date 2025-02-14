const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { defaultTimestamps, sequelizeOptions } = require("../utils/config");

const User = sequelize.define(
  "users",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    ...defaultTimestamps, // ใช้ค่าที่แยกไว้ใน config.js
  },
  sequelizeOptions // ใช้ options ที่กำหนดใน config.js
);

module.exports = User;
