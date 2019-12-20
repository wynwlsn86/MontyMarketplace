import { Schema } from 'mongoose'

const PhoneSchema = new Schema(
  {
    brand: {
      type: String
    },
    model_number: {
      type: String
    },
    esn: {
      type: String
    },
    storage: {
      type: String
    },
    condition: {
      type: String
    },
    price: {
      type: String
    },
    cost: {
      type: String
    },
    imei: {
      type: String
    },
    imageUrl: {
      type: Schema.Types.ObjectId,
      ref: 'phone_images'
    }
  },
  {
    timestamps: true
  }
)

export { PhoneSchema }
