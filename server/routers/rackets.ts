import { t } from "../trpc"
import { z } from 'zod'
import getRacketProcedure from "../queries/get-racket"

const PAGE_SIZE = 12

const fetchProcedure = t.procedure.input(z.object({
    page: z.number(), 
    filter: z.object({
        brand: z.array(z.string()).optional(),
        type: z.array(z.string()).optional(),
        weight: z.array(z.string()).optional(),
        price: z.object({min: z.number().optional(), max: z.number().optional()}).optional()
    }).optional(),
    sort: z.string().optional()
}))

const racketRouter = t.router({
    getRackets: fetchProcedure.query(async (req) => {
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
            racket: {
                type: filter?.type ? { in: filter.type } : undefined,
                weight: filter?.weight ? { in: filter.weight } : undefined,
            },
        }
        console.log("queryArgs: ", queryArgs)
        try{
            const rackets = await prisma.product.findMany({
                where: {
                    category: { equals: 'RACKET'},
                    ...queryArgs
                },
                orderBy: {
                    price: sort === "low-high"? "asc" : sort === "high-low"? "desc" : undefined,
                    name: sort === "ascending"? "asc" : sort === "descending"? "desc" : undefined,
                    createdAt: sort === "new-old"? "desc" : sort === "old-new"? "asc" : undefined
                },
                include: {
                    racket: true
                },
                skip, 
                take: PAGE_SIZE
            })
            return rackets
        }catch(error: any){
            console.error("Error fetching rackets:", error.message)
            throw new Error("Failed to fetch rackets.")
        }
    }),
    getRacket: getRacketProcedure
})

export default racketRouter