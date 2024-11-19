import { t } from "../trpc";
import { z } from "zod";

const PAGE_SIZE = 12

const getShoesInput = z.object({
    page: z.number(), 
    filter: z.object({
        brand: z.array(z.string()).optional(),
        type: z.array(z.enum(["MALE", "FEMALE", "UNISEX"])).optional(),
        size: z.array(z.string()).optional(),
        price: z.object({min: z.number().optional(), max: z.number().optional()}).optional()
    }).optional(),
    sort: z.string().optional()
})

const getShoesProcedure = t.procedure.input(getShoesInput).query(async (req) => {
    const { prisma } = req.ctx
    const { page, filter, sort } = req.input
    const skip = PAGE_SIZE * (page <= 0? 1: page -1)
    console.log("filter: ", filter)
    console.log("sort: ", sort)
    const queryArgs = {
        brand: filter?.brand? { in: filter?.brand } : undefined,
        price: filter?.price? {
             gte: filter.price.min,
             lte: filter.price.max
            } 
            : undefined,
        shoe: {
            type: filter?.type ? { in: filter.type } : undefined,
            size: filter?.size ? { in: filter.size } : undefined,
        },
    }
    console.log("queryArgs: ", queryArgs)
    try{
        const [count, shoesData] = await prisma.$transaction([
            prisma.product.count({
                where: {
                    category: { equals: 'SHOE' },
                    ...queryArgs,
                  },
            }),
            prisma.product.findMany({
                where: {
                    category: { equals: 'SHOE'},
                    ...queryArgs
                },
                orderBy: {
                    price: sort === "low-high"? "asc" : sort === "high-low"? "desc" : undefined,
                    name: sort === "ascending"? "asc" : sort === "descending"? "desc" : undefined,
                    createdAt: sort === "new-old"? "desc" : sort === "old-new"? "asc" : undefined
                },
                include: {
                    shoe: true
                },
                skip, 
                take: PAGE_SIZE
            })
        ])
        const numOfPages = Math.ceil(count/PAGE_SIZE)
        console.log("count: ", count)
        return { shoesData, numOfPages }
    }catch(error: any){
        console.error("Error fetching shoes:", error.message)
        throw new Error("Failed to fetch shoes.")
    }
})

export default getShoesProcedure