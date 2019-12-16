import { model } from 'mongoose'
import * as models from './models'

export const ApparelModel = model('apparel', models.ApparelSchema)
export const CategoryModel = model('categories', models.CategorySchema)
export const CustomerModel = model('customers', models.CustomerSchema)
export const OrderModel = model('orders', models.OrderSchema)
export const PhoneModel = model('phones', models.PhoneSchema)
export const PhoneImageModel = model('phone_images', models.PhoneImageSchema)
export const UserModel = model('users', models.UserSchema)
export const SubCategoryModel = model(
  'sub_categories',
  models.SubCategorySchema
)
