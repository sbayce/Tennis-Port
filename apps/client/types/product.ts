import { Racket } from "./racket"
import { Shoe } from "./shoe"
import { RacketInfo } from "./racket"

export type Product = {
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
    racket: RacketInfo,
    shoe: {
      size: string[],
      type: typeof ShoeGender[keyof typeof ShoeGender]
    } | null
}

const ShoeGender: {
  MALE: 'MALE'
  FEMALE: 'FEMALE',
  UNISEX: "UNISEX"
} = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNISEX: "UNISEX"
}

export const ProductCategory: {
    RACKET: 'RACKET'
    SHOE: 'SHOE'
  } = {
    RACKET: 'RACKET',
    SHOE: 'SHOE',
  }

// Type guard
export const isRacket = (product: Racket | Shoe): product is Racket => {
  return product.category === "RACKET"
}