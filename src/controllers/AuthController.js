import { UserModel } from '../database/Schema'
import { VerifyPassword, signToken, HashPassword } from '../auth'

class AuthController {
  async loginUser(req, res) {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })
      if (user && (await VerifyPassword(user, password))) {
        const payload = {
          _id: user._id,
          email: user.email
        }
        const token = signToken(payload)
        res.send({ user: payload, token })
      } else {
        res.status(401).json({ error: 'Invalid Credentials' })
      }
    } catch (error) {
      res.status(401).json({ error: 'Cannot Log In Right Now' })
    }
  }

  async registerUser(req, res) {
    try {
      const { email, password } = req.body
      const password_digest = await HashPassword(password, res)
      const newUser = new UserModel({
        email,
        password_digest
      })
      const payload = {
        _id: newUser._id,
        email
      }
      await newUser.save()
      res.json({ payload })
    } catch (error) {
      throw error
    }
  }
}

export { AuthController }
