import { t } from "../trpc"
import { z } from "zod"
import Stripe from "stripe"

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    typescript: true
})
console.log("eshta: ", process.env.STRIPE_SECRET_KEY)

const checkoutProcedure = t.procedure.input(z.object({productIds: z.array(z.string()), amount: z.number()})).mutation(async (req) => {
    const { productIds, amount } = req.input
    // create a dynamic metadeta obj for cases where users buy multiple products
    const metadata = productIds.reduce((acc, id, index) => {
        acc[`product_${index + 1}`] = id
        return acc
      }, {} as Record<string, string>)
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: "USD",
            metadata
        })
        return { status: 200, clientSecret: paymentIntent.client_secret, message: "success" }
    }catch(error: any) {
        console.log("checkout failed: ", error.message)
        return { status: 400, clientSecret: null, message: error.message }
    }
})

export default checkoutProcedure