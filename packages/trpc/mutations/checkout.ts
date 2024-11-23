import { t } from "../trpc"
import { z } from "zod"
import Stripe from "stripe"

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    typescript: true
})
console.log(process.env.STRIPE_SECRET_KEY)

const checkoutProcedure = t.procedure.input(z.object({checkoutProducts: z.array(z.object({
    productId: z.string(),
    quantity: z.number()
})), amount: z.number()})).mutation(async (req) => {
    const { checkoutProducts, amount } = req.input
    // create a dynamic metadeta obj for cases where users buy multiple products
    const metadata = checkoutProducts.reduce((acc, { productId, quantity }, index) => {
        acc[`product_${index + 1}_id`] = productId;
        acc[`product_${index + 1}_quantity`] = quantity.toString();
        return acc;
      }, {} as Record<string, string>);
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