import { t } from "../trpc"
import { z } from "zod"

const createOrderProcedure = t.procedure.input(z.object({
    productIds: z.array(z.string()), 
    total: z.number(),
    products: z.array(z.object({ productId: z.string(), quantity: z.number() }))
})).mutation(async (req) => {
    const { prisma } = req.ctx
    const { productIds, total, products } = req.input
    try{
        // const order = await prisma.order.create({
        //     data: {
        //         items: {
        //             createMany: {
        //                 data: productIds.map(productId => ({
        //                     productId,

        //                 }))
        //             }
        //         }
        //     }
        // })
    }catch(error: any) {
        console.log("Order creation failed: ", error.message)
        return { status: 500, message: error.message }
    }
})

export default createOrderProcedure