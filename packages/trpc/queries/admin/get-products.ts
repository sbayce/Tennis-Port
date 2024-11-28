import { adminProcedure } from '../../trpc'
import { z } from 'zod'

const getProductsProcedure = adminProcedure.input(
    z.object({
        category: z.string().optional(),
        id: z.string().optional()
    }).optional()
).query(async (req) => {
    const { prisma } = req.ctx
    const params = req.input
    let filters: any = {}
    if(params?.category) {
        filters.category =  params.category
    }
    if(params?.id) {
        filters.id =  params.id
    }
    const products = await prisma.product.findMany({
        where: filters,
        select: {
            id: true,
            name: true,
            brand: true,
            category: true,
            image: true,
            price: true,
            stock: true,
        }
    })
    return products
})

export default getProductsProcedure