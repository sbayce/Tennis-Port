import { t } from "../trpc";
import getOrdersProcedure from "../queries/get-orders";

const adminRouter = t.router({
    getOrders: getOrdersProcedure
})

export default adminRouter