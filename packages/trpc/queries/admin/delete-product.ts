import { adminProcedure } from '../../trpc'
import { z } from 'zod'

export const deleteProductProcedure = adminProcedure.input(z.string()).mutation(async (req) => {
    const { prisma } = req.ctx
    try{
        const productId = req.input

        const product = await prisma.product.delete({
            where: {
                id: productId
            }
        })
        return product
    }catch(error: any) {
        if (error.code === "P2025") {
            throw new Error("Product not found")
        }
        throw new Error("Failed to delete product")
    }
})