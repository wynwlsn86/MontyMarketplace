import { Schema } from 'mongoose'

const SubCategorySchema = new Schema(
  {
    name: String,
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: 'apparels' }]
    }
  },
  {
    timestamps: true
  }
)

export { SubCategorySchema }
