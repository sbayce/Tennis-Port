import { t } from "../trpc";
import { z } from "zod";

const searchProductsProcedure = t.procedure.input(z.string()).query(async (req) => {
    const { prisma } = req.ctx
    const searchInput = req.input
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            brand: true,
            price: true
        },
        where: {
            OR: [
                {
                    name: {
                        contains: searchInput,
                        mode: "insensitive"
                    },
                },
                {
                    brand: {
                        contains: searchInput,
                        mode: "insensitive"
                    },
                }
            ]
        },
    })
    console.log("products found: ", products)
    return products
})

export default searchProductsProcedure