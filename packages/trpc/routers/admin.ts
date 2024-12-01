import { t } from "../trpc";
import getOrdersProcedure from "../queries/get-orders";
import getProductPsrocedure from "../queries/admin/get-products";
import { addProductProcedure } from '../queries/admin/add-product'
import { deleteProductProcedure } from '../queries/admin/delete-product'
import { updateProductProcedure } from '../queries/admin/update-product'

const adminRouter = t.router({
    getOrders: getOrdersProcedure,
    getProducts: getProductPsrocedure,
    addProduct: addProductProcedure,
    deleteProduct: deleteProductProcedure,
    updateProduct: updateProductProcedure
})

export default adminRouter