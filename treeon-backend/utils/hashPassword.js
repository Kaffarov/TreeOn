const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password
 * @param {string} password
 * @returns {Promise<string>} hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compare a plain password with a hashed one
 * @param {string} password - plain text password
 * @param {string} hashedPassword - hashed password from DB
 * @returns {Promise<boolean>} true if matches
 */
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };