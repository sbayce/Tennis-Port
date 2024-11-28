import { t } from "../trpc";
import getOrdersProcedure from "../queries/get-orders";
import getProductPsrocedure from "../queries/admin/get-products";
import { addProductProcedure } from '../queries/admin/add-product'

const adminRouter = t.router({
    getOrders: getOrdersProcedure,
    getProducts: getProductPsrocedure,
    addProduct: addProductProcedure
})

export default adminRouter