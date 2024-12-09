"use client"
import { useCartStore } from "@/store/store"
import CartProduct from "@/components/CartProduct"
import { egp } from "@/utils/price-formatter"
import Link from "next/link"

const CartPage = () => {
    const { items, deleteItem, total } = useCartStore()
    
      return (
        <div className="flex flex-col items-center justify-center bg-gray-50 py-6">
          {items.length > 0? <>
          <h1 className="text-3xl font-bold mb-6">Cart</h1>
            <div className="overflow-x-auto w-full max-w-4xl">
            <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6 text-left">Product</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">
                        <CartProduct item={item} />
                    </td>
                    <td className="py-3 px-6 text-center">
                        <div className="flex flex-col gap-2">
                            {item.quantity}
                            <button onClick={() => deleteItem(item.id)} className="text-xs">Remove</button>
                        </div>
                        </td>
                    <td className="py-3 px-6 text-right">{egp.format(item.price)} EGP</td>
                  </tr>
                ))}
              </tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 text-2xl font-semibold">
                    <td className="py-3 px-6 text-left">
                        Total
                    </td>
                    <td />
                    <td className="py-3 px-6 ml-auto text-right">
                        {egp.format(total)} EGP
                    </td>
                </tr>
            </table>
          </div>
          <Link href='/checkout' className="rounded-[50px] bg-[#C75828] mx-auto text-center py-4 px-16 mt-6 text-white font-bold text-sm">Checkout</Link>
          </>
          :
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-lg md:text-2xl font-semibold'>Your cart is empty</h3>
            <Link href={`rackets`} className='bg-[#C75828] p-4 rounded-[50px] text-md font-semibold text-white text-center'>Continue shopping</Link>
          </div>
          }
        </div>
      );
}

export default CartPage