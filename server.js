const fastify = require('fastify')({
  logger: true
})

const generateToken = require('./generate-token')
const validateToken = require('./validate-token')

const SECRET_KEY = process.env.SECRET_KEY
if (!SECRET_KEY) throw new Error('Environment variable: SECRET_KEY has to be specified')

/**
 * Validate Short Token
 */
fastify.get('/validateToken', async (request, reply) => {
  const token = validateToken({ token: shortToken, secretKey: SECRET_KEY })
  reply.send({ valid: token })
})

/**
 * Generate Token
 */
fastify.get('/generateToken', async (request, reply) => {
  let acl = request.query.acl
  let window = request.query.window
  if (!acl) throw new Error('Specify "acl" in query string')
  const longToken = generateToken({
    algorithm: "SHA256",
    acl: acl,
    window: window || 60000,
    secretKey: SECRET_KEY
  })
  console.log('Generated Long Token:' + longToken)
  return longToken
})

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
