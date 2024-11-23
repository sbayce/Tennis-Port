import { t } from "../trpc";
import checkoutProcedure from "../mutations/checkout";
import createOrderProcedure from '../mutations/create-order'

const checkoutRouter = t.router({
    checkout: checkoutProcedure,
    createOrder: createOrderProcedure
})

export default checkoutRouter