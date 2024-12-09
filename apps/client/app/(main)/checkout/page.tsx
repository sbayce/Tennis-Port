"use client"
import CheckoutForm from "@/components/checkout/CheckoutForm"
import trpc from "@/trpcClient"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useCartStore } from "@/store/store"
import { Product } from "@/types/product"
import { egp } from "@/utils/price-formatter"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
)

const ProductCheckoutPage = () => {
  const params = useSearchParams()
  const productId = String(params.get("id"))
  const gripSize = String(params.get("gripSize"))
  const stringOption = String(params.get("stringOption"))

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [productData, setProductData] = useState<Product>()
  const { items, total } = useCartStore()

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const productData = await trpc.getProduct.query(productId)
        const amount = params.size > 0? Number(productData?.price) : total
        const checkoutProducts = params.size > 0? [{ productId, quantity: 1 }] : items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          gripSize: item.gripSize,
          stringOption: item.stringOption,
          shoeSize: item.size
        }))
        const res = await trpc.checkout.mutate({ checkoutProducts, amount })
        if(productData) setProductData(productData)
        setClientSecret(res.clientSecret)
      } catch (error) {
        console.error("Error fetching client secret:", error)
      }
    }
    fetchClientSecret()
  }, [])

  if (!clientSecret) {
    return <div>Loading...</div>
  }
  
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="flex flex-col md:flex-row gap-10 mt-4 mb-10 px-6 md:px-10">
        <CheckoutForm />
        <div className="flex flex-col gap-2 md:mr-auto">
          {params.size === 0 && items.map(item => 
            <div key={item.id} className="flex gap-2 items-center">
              <div className="relative border rounded-lg">
                <div className="rounded-full w-4 h-4 flex items-center justify-center absolute text-white text-sm bg-[#202223] top-0 right-0">
                  {item.quantity}
                </div>
                <img className="h-20 w-20" src={item.image} alt="product-img" />
              </div>
              <div>
                <p>{item.name}</p>
                <p className="text-xs">{egp.format(item.price)} EGP</p>
                <p className="text-xs">Grip: {item.gripSize}</p>
                <p className="text-xs">String option: {item.stringOption}</p>
              </div>
            </div>
          )}
          {params.size > 0 && productData &&
            <div className="flex gap-2 items-center">
            <img className="h-20 w-20 border rounded-lg" src={productData.image} alt="product-img" />
            <div>
              <p>{productData.name}</p>
              <p className="text-xs">{egp.format(productData.price)} EGP</p>
              <p className="text-xs">Grip: {gripSize}</p>
              <p className="text-xs">String option: {stringOption}</p>
            </div>
          </div>}
          <div className="flex gap-2 items-center text-xl mt-4">
            <h3 className="font-semibold">Total:</h3>
            <p>{productData? egp.format(productData.price) : egp.format(total)} EGP</p>
          </div>
        </div>
      </div>
    </Elements>
  )
}

export default ProductCheckoutPage