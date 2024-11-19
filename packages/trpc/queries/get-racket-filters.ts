import { t } from "../trpc";
import { z } from "zod";

const getRacketFiltersProcedure = t.procedure.query(async (req) => {
    const { prisma } = req.ctx
    const racket = await prisma.product.findMany({
        where: {
            
        },
    })
    console.log("found racket: ", racket)
    return racket
})

export default getRacketFiltersProcedure