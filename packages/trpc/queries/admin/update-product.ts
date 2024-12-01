import { adminProcedure } from '../../trpc'
import { updateProductSchema } from '../../schemas/update-product'
import { z } from 'zod'

export const updateProductProcedure = adminProcedure.input(z.object({
    data: updateProductSchema,
    productId: z.string()
})).mutation(async (req) => {
    const { prisma } = req.ctx
    const productId = req.input.productId
    const { name, brand, price, stock, image, image2, images, category, racketType, headSize, pattern, size, shoeType, weight } = req.input.data
    try{
        let data: any = {
            name,
            brand,
            price: Number(price),
            stock: Number(stock),
            category
        }
        if(category === "RACKET") {
            data.racket = {
                update: {
                    headSize,
                    pattern,
                    type: racketType,
                    weight
                }
            }
        }
        if(category === "SHOE") {
            data.shoe = {
                update: {
                    size,
                    type: shoeType,
                }
            }
        }
    
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data
        })
        return updatedProduct
    }catch(error: any) {
        if (error.code === "P2025") {
            throw new Error("Product not found");
        }
        throw new Error("Failed to update product");
    }
})