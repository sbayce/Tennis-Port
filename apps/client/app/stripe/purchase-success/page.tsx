import { notFound } from "next/navigation";
import Stripe from "stripe";
import trpc from "@/trpcClient";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    typescript: true
})

const PurchaseSuccessPage = async ({ searchParams }: { searchParams: { payment_intent: string } }) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    if(!paymentIntent.metadata) return notFound()
    const productIds = Object.values(paymentIntent.metadata).map(id => id)
    const products = await trpc.getProductsByIds.query(productIds)
    if(products.length === 0) return notFound()
    console.log(products)

  return (
    <div>
        <h1 className="text-3xl font-semibold text-center">Payment Success</h1>
        <div className="grid grid-cols-3 gap-4">
            {products.map(product => 
                <div key={product.id} className="flex gap-2 items-center">
                <div className="relative border rounded-lg">
                    <div className="rounded-full w-4 h-4 flex items-center justify-center absolute text-white text-sm bg-[#202223] top-0 right-0">
                        {/* {item.quantity} */}
                    </div>
                    <img className="h-20 w-20" src={product.image} alt="product-img" />
                </div>
                <div>
                    <p>{product.name}</p>
                    <p className="text-xs">{product.price} EGP</p>
                    <p className="text-xs">{product.brand}</p>
                    {/* <p className="text-xs">Grip: {item.gripSize}</p>
                    <p className="text-xs">String option: {item.stringOption}</p> */}
                </div>
                </div>
            )}
            </div>
            <div className="flex gap-2 items-center text-xl mt-4">
                <h3 className="font-semibold">Total:</h3>
                {/* <p>{productData? productData.price : total}</p> */}
            </div>
    </div>
  )
}

export default PurchaseSuccessPage