/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import Stripe from "stripe";
import trpc from "@/trpcClient";
import { egp } from "@/utils/price-formatter";
import { getEgpRate } from "trpc/utils/get-egp-rate";

const stripe = new Stripe(String(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY), {
    typescript: true
})

const PurchaseSuccessPage = async ({ searchParams }: { searchParams: { payment_intent: string, payment_intent_client_secret: string } }) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    if(!paymentIntent.metadata) return notFound()

    const usdToEgpRate = await getEgpRate()
    const total = (paymentIntent.amount/100) * usdToEgpRate
    const purchasedProducts = JSON.parse(paymentIntent.metadata.products as string)
    const productIds: string[] = purchasedProducts.map((product: any) => product.productId)
    console.log("purchasedProducts: ", purchasedProducts)
    console.log("productIds: ", productIds)
    console.log("adress: ", paymentIntent.shipping?.address)
    console.log("name: ", paymentIntent.shipping?.name)
    const products = await trpc.getProductsByIds.query(productIds)
    if(products.length === 0) return notFound()

  return (
    <div className="mt-4">
        <h1 className="text-3xl font-semibold text-center">Payment Success</h1>
        <h3 className="font-semibold text-center my-4">Total: {egp.format(total)} <span className="text-sm font-normal">EGP</span></h3>
        <div className="text-center">
            <h2>A conformation email has been sent to you.</h2>
        </div>
        <div className="mx-auto">
            <div className="flex md:flex-row flex-col md:items-center flex-wrap gap-4 mt-6 justify-around">
                {products.map((product, i) => 
                    <div key={product.id} className="flex gap-2 items-center">
                    <div className="relative border rounded-lg">
                        <div className="rounded-full w-4 h-4 flex items-center justify-center absolute text-white text-sm bg-[#202223] top-0 right-0">
                            {purchasedProducts[i].quantity}
                        </div>
                        <img className="h-20 w-20" src={product.image} alt="product-img" />
                    </div>
                    <div>
                        <p>{product.name}</p>
                        <p className="text-xs">{egp.format(product.price)} EGP</p>
                        <p className="text-xs">{product.brand}</p>
                        {purchasedProducts[i].gripSize && <p className="text-xs">Grip: {purchasedProducts[i].gripSize}</p>}
                        {purchasedProducts[i].stringOption && <p className="text-xs">String option: {purchasedProducts[i].stringOption}</p>}
                        {purchasedProducts[i].shoeSize && <p className="text-xs">Size: {purchasedProducts[i].shoeSize}</p>}
                    </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default PurchaseSuccessPage