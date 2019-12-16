import { Schema } from 'mongoose'

const SubCategorySchema = new Schema(
  {
    name: String
  },
  {
    timestamps: true
  }
)

export { SubCategorySchema }
