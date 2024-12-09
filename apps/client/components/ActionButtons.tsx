"use client"
import { useCartStore } from "@/store/store"
import { Product } from "@/types/product"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import CartItem from "@/types/cart-item"
import { isRacket } from "@/types/product"

const ActionButtons = ({ productData }: { productData: Product }) => {
    const addItem = useCartStore(state => state.addItem)
    const searchParams = useSearchParams()
    const gripSize = searchParams.get("grip") || "2"
    const stringOption = searchParams.get("string") || "unstrung"
    const shoeSize = searchParams.get("size") || productData.shoe?.size[0]
    const isOutOfStock = productData.stock <= 0

    const handleAdd = () => {
      const cartItem: CartItem = {
        id: productData.id,
        name: productData.name,
        brand: productData.brand,
        image: productData.image,
        price: productData.price,
        quantity: 1,
    }
    if(isRacket(productData)) {
        cartItem.gripSize = gripSize
        cartItem.stringOption = stringOption
    }else{
        cartItem.size = shoeSize
    }
    addItem(cartItem)
    }

    if(isOutOfStock) return <div className="rounded-3xl bg-[#cfcfcf] p-4 w-full mx-4 pointer-events-none text-center text-[#202223] font-bold text-sm">Sold out</div>
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-6">
        <button onClick={handleAdd} className="rounded-3xl bg-[#202223] p-4 w-full text-white font-bold text-sm">Add to cart</button>
        <Link href={{ pathname: `/checkout`, query: {
          id: productData.id,
          productName: productData.name,
          image: productData.image,
          gripSize,
          stringOption
        } }} className="rounded-3xl bg-[#C75828] text-center p-4 w-full text-white font-bold text-sm">Checkout</Link>
    </div>
  )
}
export default ActionButtons