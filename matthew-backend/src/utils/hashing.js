const crypto = require('crypto');

/**
 * Generate SHA-256 hash of an object for blockchain storage
 * @param {Object} obj - Object to hash
 * @returns {string} - Hex hash string
 */
module.exports = function hash(obj) {
  const str = JSON.stringify(obj, Object.keys(obj).sort());
  return crypto.createHash('sha256').update(str).digest('hex');
};