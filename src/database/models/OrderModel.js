import { Schema } from 'mongoose'

const OrderSchema = new Schema(
  {
    apparal: {
      type: String
    },
    item_quantity: {
      type: Number
    },
    size: {
      type: String
    },
    color: {
      type: String
    },
    customer_id: {
      type: String
    },
    total: {
      type: String
    },
    isFulfilled: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

export { OrderSchema }
