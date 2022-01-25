const hmacValidator = require('shopify-hmac-validation')
const checkHmacValidity = require('shopify-hmac-validation').checkHmacValidity
const crypto = require('crypto')
const CryptoJS = require('crypto-js')

/**
 * Fulfill Akamai intreoperability requirements
 * 
 * @param {Object} obj
 * @returns {Object}
 */
function interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }
const Crypt = interopRequireDefault(require('./crypt'))

/**
 * HEX to binary
 *
 * @param {String} str
 * @returns {BinaryData} bin
 */
var h2b = function h2b(str) {
  var bin = '',
    pointer = 0;
  do {
    var subStr = str[pointer] + str[pointer + 1],
      hexVal = parseInt((subStr + '').replace(/[^a-f0-9]/gi, ''), 16);
    bin += String.fromCharCode(hexVal);
    pointer += 2;
  } while (pointer < str.length);
  return bin;
};

/**
 * Validate HMAC token (Akamai Style)
 *
 * @param {Object} config 
 * @param {String} config.token
 * @param {String} config.secretKey
 * @returns 
 */
module.exports = ({ token, secretKey }) => {
  const parts = token.split('~')
  const inputObject = parts.reduce((agg, part) => {
    const array = part.split('=')
    agg[array[0]] = array[1]
    return agg
  }, {})

  // Validate Timing
  const now = new Date().getTime() / 1000
  if (Number(inputObject.st) > now || Number(inputObject.exp) < now) {
    console.log('Token out of window')
    return false
  }

  const digest = 'st=' + inputObject.st + '~exp=' + inputObject.exp + '~acl=' + inputObject.acl
  const hash = '' + Crypt.default.HmacSHA256(digest, h2b(secretKey));
  if (hash !== inputObject.hmac) {
    console.log('Token does not match the signature')
    return false
  } else return true
}