import { Schema } from 'mongoose'

const CategorySchema = new Schema(
  {
    group: {
      type: String
    },
    attire: {
      type: [{ type: String }]
    },
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
