import { t } from "../trpc";
import checkoutProcedure from "../mutations/checkout";

const checkoutRouter = t.router({
    checkout: checkoutProcedure
})

export default checkoutRouter