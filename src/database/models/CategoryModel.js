import { Schema } from 'mongoose'

const CategorySchema = new Schema(
  {
    name: String,
    gender: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
export { CategorySchema }
