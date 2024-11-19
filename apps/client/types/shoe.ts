import { ProductCategory } from "./product"

export type Shoe = {
    id: string
    name: string
    image: string
    image2: string
    images: string[]
    brand: string
    price: number
    stock: number
    category: typeof ProductCategory[keyof typeof ProductCategory]
    createdAt: string
    updatedAt: string
    shoe: {
      size: string[],
      type: typeof ShoeGender[keyof typeof ShoeGender]
    } | null
  }

  export const ShoeGender: {
    MALE: 'MALE'
    FEMALE: 'FEMALE',
    UNISEX: "UNISEX"
  } = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNISEX: "UNISEX"
  }