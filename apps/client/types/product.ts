import { Racket } from "./racket"
import { Shoe } from "./shoe"
import { RacketInfo } from "./racket"

export type ShoeGender = 'MALE' | 'FEMALE' | 'UNISEX'

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
      type: ShoeGender
    } | null
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