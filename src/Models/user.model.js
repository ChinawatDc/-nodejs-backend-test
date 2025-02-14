const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { defaultTimestamps, sequelizeOptions } = require("../utils/config");

const User = sequelize.define(
  "users",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otpCreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ...defaultTimestamps,
  },
  {
    ...sequelizeOptions, // ใช้ options ที่กำหนดใน config.js
    paranoid: true, // เปิดใช้งาน Soft Delete
  }
);

module.exports = User;
