import { Schema } from 'mongoose'

const PhoneImageSchema = new Schema(
  {
    imageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export { PhoneImageSchema }
