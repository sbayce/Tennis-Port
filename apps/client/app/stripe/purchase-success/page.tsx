import { notFound } from "next/navigation";
import Stripe from "stripe";
import trpc from "@/trpcClient";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    typescript: true
})

const PurchaseSuccessPage = async ({ searchParams }: { searchParams: { payment_intent: string, payment_intent_client_secret: string } }) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)
    if(!paymentIntent.metadata) return notFound()

    const total = paymentIntent.amount/100
    const productIds: string[] = [];
    const purchasedProducts: { productId: string; quantity: number }[] = [];

    // Loop through the metadata keys
    for (let i = 1; paymentIntent.metadata[`product_${i}_id`]; i++) {
        const productId = paymentIntent.metadata[`product_${i}_id`];
        const quantity = parseInt(paymentIntent.metadata[`product_${i}_quantity`], 10);

        // Populate arrays
        productIds.push(productId);
        purchasedProducts.push({ productId, quantity });
    }
    console.log("purchased: ", purchasedProducts)
    console.log("product ids: ", productIds)
    // console.log("email: ", paymentIntent.)
    console.log("adress: ", paymentIntent.shipping?.address)
    console.log("name: ", paymentIntent.shipping?.name)
    const products = await trpc.getProductsByIds.query(productIds)
    if(products.length === 0) return notFound()
    console.log(products)

  return (
    <div className="mt-4">
        <h1 className="text-3xl font-semibold text-center">Payment Success</h1>
        <div className="grid grid-cols-2 gap-4 mt-6">
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
                    <p className="text-xs">{product.price} EGP</p>
                    <p className="text-xs">{product.brand}</p>
                    {/* <p className="text-xs">Grip: {item.gripSize}</p>
                    <p className="text-xs">String option: {item.stringOption}</p> */}
                </div>
                </div>
            )}
            </div>
            <div className="flex gap-2 items-center text-xl mt-4">
                <h3 className="font-semibold">Total: {total} <span className="text-sm font-normal">EGP</span></h3>
                {/* <p>{productData? productData.price : total}</p> */}
            </div>
    </div>
  )
}

export default PurchaseSuccessPage