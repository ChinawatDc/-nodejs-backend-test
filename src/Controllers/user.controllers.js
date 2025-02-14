const { createResponse } = require("../utils/response.util");
const { HTTP_STATUS } = require("../utils/httpStatus");
const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
// Create User
const createUser = async (req, res) => {
  try {
    const password = "123456";
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    return res
      .status(HTTP_STATUS.CREATED.statusCode)
      .json(createResponse(HTTP_STATUS.CREATED, user));
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message));
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { deleted_at: null },
      paranoid: false,
    });
    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json(createResponse(HTTP_STATUS.OK, users));
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message));
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      where: { deleted_at: null },
      paranoid: false,
    });
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.statusCode)
        .json(createResponse(HTTP_STATUS.NOT_FOUND, "User not found"));
    }
    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json(createResponse(HTTP_STATUS.OK, user));
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message));
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.statusCode)
        .json(createResponse(HTTP_STATUS.NOT_FOUND, "User not found"));
    }
    await user.update(req.body);
    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json(createResponse(HTTP_STATUS.OK, user));
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message));
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.statusCode)
        .json(createResponse(HTTP_STATUS.NOT_FOUND, "User not found"));
    }

    // ใช้ Soft Delete โดยตั้งค่า deleted_at
    await user.update({ deleted_at: new Date() });

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json(createResponse(HTTP_STATUS.OK, "User deleted successfully"));
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message));
  }
};

const restoreUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { paranoid: false });
    if (!user || user.deleted_at === null) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.statusCode)
        .json(
          createResponse(HTTP_STATUS.NOT_FOUND, "User not found or not deleted")
        );
    }

    // คืนค่าผู้ใช้ที่ถูกลบ
    await user.update({ deleted_at: null });

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json(createResponse(HTTP_STATUS.OK, "User restored successfully"));
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message));
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  restoreUser,
};
