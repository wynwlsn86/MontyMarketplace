import { Schema } from 'mongoose'

const SubCategorySchema = new Schema(
  {
    name: String,
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    }
  },
  {
    timestamps: true
  }
)

export { SubCategorySchema }
