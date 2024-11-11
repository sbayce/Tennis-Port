type Product = {
    id: string
    name: string
    image: string
    image2: string
    brand: string
    price: number
    stock: number
    category: typeof ProductCategory[keyof typeof ProductCategory]
    createdAt: string
    updatedAt: string
    racket: {
        headSize: string
        pattern: string
        weight: string
        type: string
    } | null
}

export const ProductCategory: {
    RACKET: 'RACKET'
    SHOE: 'SHOE'
  } = {
    RACKET: 'RACKET',
    SHOE: 'SHOE',
  }
  
export default Product