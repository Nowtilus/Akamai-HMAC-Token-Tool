const generateToken = require('./generate-token')
const validateToken = require('./validate-token')

const usage = `GENERATE: node cli.js <key> <generate> <acl> <window>
VALIDATE: node cli.js <key> <validate> <token>`

const key = process.argv[2]
if (!key) throw new Error('Secret Key has to be specified: ' + usage)

const action = process.argv[3]
if (!action) throw new Error('Action has to be specified: ' + usage)


if (action === 'generate') {
  const acl = process.argv[4]
  if (!acl) throw new Error('ACL has to be specified: ' + usage)
  const window = process.argv[5]
  if (!window) throw new Error('Window has to be specified: ' + usage)

  const token = generateToken({
    algorithm: "SHA256",
    acl: acl,
    window: window,
    secretKey: key
  })
  console.log(token)
} else if (action === 'validate') {
  const token = process.argv[4]
  if (!token) throw new Error('Token has to be specified: ' + usage)
  const isTokenValid = validateToken({ token: token, secretKey: key })
  console.log('Token is valid: ' + isTokenValid)
} else throw new Error('Unknown action')