import { Schema } from 'mongoose'

const CategorySchema = new Schema(
  {
    name: String,
    gender: {
      type: String,
      required: true
    },
    subCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'sub_categories'
      }
    ]
  },
  {
    timestamps: true
  }
)
export { CategorySchema }
