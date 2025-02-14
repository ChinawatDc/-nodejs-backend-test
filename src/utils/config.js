module.exports = {
  sequelizeOptions: {
    timestamps: false, // ปิด createdAt และ updatedAt ของ Sequelize
    underscored: true, // ใช้ snake_case สำหรับชื่อคอลัมน์
    hooks: {
      beforeUpdate: (user) => {
        user.updated_at = new Date(); // อัปเดต updated_at อัตโนมัติเมื่อมีการเปลี่ยนแปลง
      },
    },
  },
  defaultTimestamps: {
    created_at: {
      type: require("sequelize").DataTypes.DATE,
      allowNull: false,
      defaultValue: require("sequelize").DataTypes.NOW, // ค่าเริ่มต้นเป็นวันที่ปัจจุบัน
    },
    updated_at: {
      type: require("sequelize").DataTypes.DATE,
      allowNull: false,
      defaultValue: require("sequelize").DataTypes.NOW, // ค่าเริ่มต้นเป็นวันที่ปัจจุบัน
    },
  },
};
