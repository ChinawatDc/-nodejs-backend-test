const { createResponse } = require("../utils/response.util");
const { HTTP_STATUS } = require("../utils/httpStatus");
const User = require("../Models/user.model");

// Create User
const createUser = async (req, res) => {
  try {
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
    const users = await User.findAll();
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
    const user = await User.findByPk(req.params.id);
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
    await user.destroy();
    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json(createResponse(HTTP_STATUS.OK, "User deleted successfully"));
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
};
