import 'dotenv/config'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const jwt = jsonwebtoken
const APP_SECRET = process.env.APP_SECRET

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const data = jwt.verify(token, APP_SECRET)
    res.locals.user = data
  } catch (error) {
    res.status(403).send({ error: 'Unauthorized' })
  }
}

export const signToken = payload => {
  const token = jwt.sign(
    { payload, exp: Math.floor(new Date().getTime() / 1000) + 42 * 3600 },
    APP_SECRET
  )
  return token
}

export const VerifyPassword = async (user, password, res) => {
  try {
    if (await bcrypt.compare(password, user.password_digest)) return true
    else return false
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const HashPassword = async (password, res) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
