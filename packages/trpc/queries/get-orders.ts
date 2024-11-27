import { adminProcedure } from "../trpc"

const getOrdersProcedure = adminProcedure.query(async (req) => {
    const { prisma } = req.ctx
    const orders = await prisma.order.findMany({})
    console.log("found orders: ", orders)
    return orders
})

export default getOrdersProcedure