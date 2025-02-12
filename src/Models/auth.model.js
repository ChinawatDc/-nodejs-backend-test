const db = require('../config/db');
const { userService } = require('../libs/dataService');
const { v4: uuidv4 } = require('uuid');

const findUserByEmail = async (email) => {
  try {
    const user = await userService.get(email);
    return user;
  } catch (error) {
    throw new Error('Failed to find user: ' + error.message);
  }
};

const createUser = async (email, username, password) => {
  try {
    const id = uuidv4();
    const created_at = new Date();
    const updated_at = new Date();
    const created_by = 'system';
    const updated_by = 'system';

    // const result = await db.one(
    //   `INSERT INTO users(
    //     id, email, username, password, created_by, created_at, updated_by, updated_at
    //   ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    //   [id, email, username, password, created_by, created_at, updated_by, updated_at]
    // );
    const userData = {
      id,
      email,
      username,
      password,
      created_by,
      created_at,
      updated_by,
      updated_at,
    };
    const result = await userService.save(userData);
    return result;
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
};

module.exports = { findUserByEmail, createUser };
