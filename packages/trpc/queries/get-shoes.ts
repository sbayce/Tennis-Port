import { t } from "../trpc";
import { z } from "zod";

const PAGE_SIZE = 12

const getShoesInput = z.object({
    page: z.number(), 
    filter: z.object({
        brand: z.array(z.string()).nullable(),
        type: z.array(z.enum(["MALE", "FEMALE", "UNISEX"])).nullable(),
        size: z.array(z.string()).nullable(),
        price: z.object({min: z.number().optional(), max: z.number().optional()}).nullable()
    }).optional(),
    sort: z.string().nullable()
})

const getShoesProcedure = t.procedure.input(getShoesInput).query(async (req) => {
    const { prisma } = req.ctx
    const { page, filter, sort } = req.input
    const skip = PAGE_SIZE * (page <= 0? 1: page -1)
    const queryArgs = {
        brand: filter?.brand? { in: filter?.brand } : undefined,
        price: filter?.price? {
             gte: filter.price.min,
             lte: filter.price.max
            } 
            : undefined,
        shoe: {
            type: filter?.type ? { in: filter.type } : undefined,
            size: filter?.size ? { hasSome: filter.size } : undefined,
        },
    }
    try{
        const [productCount, shoesData] = await prisma.$transaction([
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
        const numOfPages = Math.ceil(productCount/PAGE_SIZE)
        return { shoesData, numOfPages, productCount }
    }catch(error: any){
        console.error("Error fetching shoes:", error.message)
        throw new Error("Failed to fetch shoes.")
    }
})

export default getShoesProcedure