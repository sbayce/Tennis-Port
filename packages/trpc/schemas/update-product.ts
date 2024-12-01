import { z } from 'zod'

export const updateProductSchema = z.object({
    name: z.string().optional(),
    brand: z.string().optional(),
    price: z.string().optional(),
    stock: z.string().optional(),
    image: z.string().optional(),
    image2: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.enum(["RACKET", "SHOE"], {message: "Should be Racket or Shoe"}).optional(),
    headSize: z.string().optional(),
    weight: z.string().optional(),
    pattern: z.string().optional(),
    size: z.array(z.string()).optional(),
    racketType: z.string().optional(),
    shoeType: z.enum(["MALE", "FEMALE", "UNISEX"]).optional(),
})