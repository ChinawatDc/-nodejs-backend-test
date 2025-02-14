const { DataTypes } = require("sequelize");

module.exports = {
  sequelizeOptions: {
    timestamps: false, // ปิด createdAt และ updatedAt ของ Sequelize
    underscored: true, // ใช้ snake_case สำหรับชื่อคอลัมน์
    paranoid: true, // ใช้ Soft Delete
    deletedAt: "deleted_at", // กำหนดชื่อคอลัมน์สำหรับ Soft Delete
    hooks: {
      beforeUpdate: (user) => {
        user.updated_at = new Date(); // อัปเดต updated_at อัตโนมัติเมื่อมีการเปลี่ยนแปลง
      },
    },
  },
  defaultTimestamps: {
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true, // เริ่มต้นเป็น NULL
    },
  },
};
