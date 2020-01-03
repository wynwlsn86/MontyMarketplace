import { Schema } from 'mongoose'

const ApparelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String
    },
    details: [
      {
        size: String,
        color: String,
        quantity: Number
      }
    ],
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    },
    subCategory_id: {
      type: Schema.Types.ObjectId,
      ref: 'sub_categories'
    },
    imageUrl: {
      type: [{ type: String }]
    },
    description: {
      type: String
    },
    clearance: {
      type: Boolean
    },
    cost: {
      type: String
    },
    price: String
  },
  {
    timestamps: true
  }
)

export { ApparelSchema }
