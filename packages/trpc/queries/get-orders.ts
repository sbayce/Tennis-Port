import { t } from "../trpc";
import { isAuthenticated, isAdmin } from "../middlewares/authorization";

const getOrdersProcedure = t.procedure.use(isAuthenticated).use(isAdmin).query(async (req) => {
    const { prisma } = req.ctx
    const orders = await prisma.order.findMany({})
    console.log("found orders: ", orders)
    return orders
})

export default getOrdersProcedure