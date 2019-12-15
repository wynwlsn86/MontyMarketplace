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
    details: {
      type: [
        {
          size: String,
          quantity: Number
        },
        {
          color: String,
          quantity: Number
        }
      ]
    },
    category: {
      group: {
        type: String
      },
      attire: {
        type: String
      }
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
    price: {
      type: String
    },
    cost: {
      type: String
    },
    quantity: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

export { ApparelSchema }
