import { Schema } from 'mongoose'

const CustomerSchema = new Schema(
  {
    name: {
      first: {
        type: String
      },
      last: {
        type: String
      }
    },
    email: {
      type: String
    },
    phoneNumber: {
      type: String
    }
  },
  {
    timestamps: true
  }
)
export { CustomerSchema }
