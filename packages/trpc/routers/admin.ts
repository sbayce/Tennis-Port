import { t } from "../trpc";
import getOrdersProcedure from "../queries/get-orders";
import getProductPsrocedure from "../queries/admin/get-products";

const adminRouter = t.router({
    getOrders: getOrdersProcedure,
    getProducts: getProductPsrocedure
})

export default adminRouter