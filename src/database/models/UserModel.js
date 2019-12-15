import { Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
        required: true
      }
    },
    password_digest: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export { UserSchema }
