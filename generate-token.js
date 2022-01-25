const Akamai = require('akamai-auth-token')

/**
 * Generate a HMAC token
 *
 * @param {Object} config 
 * @param {String} config.algorithm 
 * @param {String} config.acl 
 * @param {Number} config.window
 * @param {String} config.secretKey
 * @returns 
 */
module.exports = (config) => {
  const configObject = {
    algorithm: config.algorithm || 'SHA256',
    acl: config.acl || "",
    window: Number(config.window) || 60000,
    key: config.secretKey,
    encoding: false
  };

  const akamai = new Akamai.default(configObject)
  const token = akamai.generateToken()
  return token
}
