import 'dotenv/config'
export const db = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      name: 'MontyMarket Production',
      connect: process.env.DATABASE_URI
    }
  } else {
    return {
      name: 'MontyMarket Development',
      connect: process.env.ATLAS_URI
    }
  }
}
