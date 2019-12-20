import { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    password_digest: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export { UserSchema }
