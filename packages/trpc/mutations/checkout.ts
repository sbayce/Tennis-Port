import { getEgpRate } from '../utils/get-egp-rate'
import { z } from "zod"
import Stripe from "stripe"
import { guestOrUserProcedure } from "../trpc"

const checkoutProcedure = guestOrUserProcedure.input(z.object({checkoutProducts: z.array(z.object({
    productId: z.string(),
    quantity: z.number(),
    gripSize: z.string().optional(),
    stringOption: z.string().optional(),
    shoeSize: z.string().optional()
})), amount: z.number()})).mutation(async (req) => {
    const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
        typescript: true
    })
    const { checkoutProducts, amount } = req.input
    const { userId } = req.ctx
    let metadata: any = {
        products: JSON.stringify(checkoutProducts)
    }
    if(userId) {
        metadata.userId = userId
    }
    try{
        const usdToEgpRate = await getEgpRate()
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round((amount/usdToEgpRate)*100),
            currency: "USD",
            metadata,
        })
        return { status: 200, clientSecret: paymentIntent.client_secret, message: "success" }
    }catch(error: any) {
        console.log("checkout failed: ", error.message)
        return { status: 400, clientSecret: null, message: error.message }
    }
})

export default checkoutProcedure