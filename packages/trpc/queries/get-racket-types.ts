import { t } from "../trpc"

const getRacketTypesProcedure = t.procedure.query(async (req) => {
    const { prisma } = req.ctx
    const data = await prisma.product.findMany({
        where: {
          category: "RACKET",
        },
        select: {
          racket: {
            select: {
                type: true
            }
          }
        },
      })
      const types = Array.from(new Set(data.map((d) => String(d.racket?.type)).filter(Boolean)))

    return { types }
})

export default getRacketTypesProcedure