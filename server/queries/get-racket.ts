import { t } from "../trpc";
import { z } from "zod";

const getRacketProcedure = t.procedure.input(z.string()).query(async (req) => {
    const { prisma } = req.ctx
    const racketId = req.input
    const racket = await prisma.product.findUnique({
        where: {
            id: racketId
        },
        include: {
            racket: true
        }
    })
    console.log("found racket: ", racket)
    return racket
})

export default getRacketProcedure