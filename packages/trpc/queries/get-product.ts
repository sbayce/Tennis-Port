import { t } from "../trpc";
import { z } from "zod";

const getProductProcedure = t.procedure.input(z.string()).query(async (req) => {
    const { prisma } = req.ctx
    const productId = req.input
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {
            racket: true,
            shoe: true
        }
    })
    return product
})

export default getProductProcedure