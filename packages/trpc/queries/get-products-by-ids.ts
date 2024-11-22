import { t } from "../trpc";
import { z } from "zod";

const getProductsByIdsPrecedure = t.procedure.input(z.array(z.string())).query(async (req) => {
    const { prisma } = req.ctx
    const productIds = req.input
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds
            }
        },
        select: {
            id: true,
            name: true,
            brand: true,
            image: true,
            price: true,
        }
    })
    console.log("found products: ", products)
    return products
})

export default getProductsByIdsPrecedure