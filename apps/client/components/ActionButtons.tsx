"use client"
import { useCart } from "@/contexts/CartContext"
import { Product } from "@/types/product"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import CartItem from "@/types/cart-item"

const ActionButtons = ({ racketData }: { racketData: Product }) => {
    const { addItem } = useCart()
    const searchParams = useSearchParams()
    const gripSize = searchParams.get("grip") || "2"
    const stringOption = searchParams.get("string") || "unstrung"
    const isOutOfStock = racketData.stock <= 0

    const handleAdd = (racketData: Product) => {
      const cartItem: CartItem = {
        id: racketData.id,
        name: racketData.name,
        brand: racketData.brand,
        image: racketData.image,
        price: racketData.price,
        quantity: 1,
        gripSize,
        stringOption
      }
      addItem(cartItem)
    }

    if(isOutOfStock) return <div className="rounded-3xl bg-[#cfcfcf] p-4 w-full mx-4 pointer-events-none text-center text-[#202223] font-bold text-sm">Sold out</div>
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6">
        <button onClick={() => handleAdd(racketData)} className="rounded-3xl bg-[#202223] p-4 w-full text-white font-bold text-sm">Add to cart</button>
        <Link href={{ pathname: `/checkout`, query: {
          id: racketData.id,
          productName: racketData.name,
          image: racketData.image,
          gripSize,
          stringOption
        } }} className="rounded-3xl bg-[#C75828] text-center p-4 w-full text-white font-bold text-sm">Checkout</Link>
    </div>
  )
}
export default ActionButtons