import { t } from "../trpc";
import { z } from "zod";
import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    typescript: true
})
console.log("eshta: ", process.env.STRIPE_SECRET_KEY)

const checkoutProcedure = t.procedure.input(z.object({amount: z.number()})).mutation(async (req) => {
    const { amount } = req.input
    try{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: "USD"
        })
        return { status: 200, clientSecret: paymentIntent.client_secret, message: "success" }
    }catch(error: any) {
        console.log("checkout failed: ", error.message)
        return { status: 400, clientSecret: null, message: error.message }
    }
})

export default checkoutProcedure