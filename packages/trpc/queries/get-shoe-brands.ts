import { t } from "../trpc"

const getShoeBrandsProcedure = t.procedure.query(async (req) => {
    const { prisma } = req.ctx
    const data = await prisma.product.findMany({
        where: {
          category: "SHOE",
        },
        select: {
          brand: true,
        },
        distinct: ['brand'],
      })
      const brands = data.map(brand => brand.brand)

    return { brands }
})

export default getShoeBrandsProcedure