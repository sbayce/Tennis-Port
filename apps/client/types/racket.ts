import { ProductCategory } from "./product"

export type Racket = {
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
  racket: RacketInfo
}

export type RacketInfo = {
    headSize: string
    pattern: string
    weight: string
    type: string
  } | null