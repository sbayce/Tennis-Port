import React, { useState } from 'react'
import CartIcon from '@/icons/cart-outline.svg'
import { useCart } from '@/contexts/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import ProductNameLink from './ProductNameLink'
import CartItem from '@/types/cart-item'

const CartButton = () => {
    const { items, numOfItems, total, addItem, removeItem } = useCart()
    const [prevCount, setPrevCount] = useState(numOfItems)
    const handleDecrement = (id: string) => {
      removeItem(id)
      setPrevCount(numOfItems)
    }
    const handleIncrement = (item: CartItem) => {
      addItem(item)
      setPrevCount(numOfItems)
    }
    console.log("prev: ", prevCount)
    console.log("num: ", numOfItems)
  return (
    
    <Sheet>
      <SheetTrigger asChild>
        <div className='relative'>
              <Badge className={`absolute -top-4 ${numOfItems > 0? "bg-[#C75828]" : "bg-transparent"}`}>
              <AnimatePresence mode='wait'>
                <motion.p className='mt-0.5' key={numOfItems} initial={{y: 20, opacity: 0}} 
                      animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} 
                      transition={{duration: 0.2}}>{numOfItems}</motion.p>
              </AnimatePresence>
              </Badge>
        <button className='flex flex-col items-center text-sm hover:text-[#C75828] transition-colors duration-100 ease-in-out'><CartIcon className='w-6' /></button>
      </div>
      </SheetTrigger>
      <SheetContent className='min-w-[600px] rounded-xl h-[96%] mt-4 mr-4'>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
          {items.length > 0? 
            <div className='flex flex-col mt-4 h-full'>
              <div>
              {items.map(item => <div key={item.id} className='flex gap-6 items-center'>
                <img src={item.image} alt='item-image' className='w-24' />
                <div>
                  <ProductNameLink productId={item.id} name={item.name} />
                  <p className='text-sm'>LE <span className='ml-1'>{item.price}</span></p>
                  {item.gripSize && <p className='text-xs'>Grip: {item.gripSize}</p>}
                  {item.stringOption && <p className='text-xs'>String: {item.stringOption}</p>}
                  {item.size && <p className='text-xs'>Size: {item.size}</p>}
                  {item.type && <p className='text-xs'>{item.type}</p>}
                </div>
                <div className='flex gap-2 ml-auto mr-4 text-xs items-center'>
                  <button onClick={() => handleDecrement(item.id)} className='hover:opacity-70 p-2'>-</button>
                  <div className='border border-zinc-300 rounded-md py-1 px-2 text-center mx-2'>
                  <AnimatePresence mode="wait">
                    <motion.p key={item.quantity} initial={{y: numOfItems > prevCount? -20 : 20, opacity: 0}} 
                      animate={{y: 0, opacity: 1}} exit={{y: numOfItems > prevCount? 20 : -20, opacity: 0}} 
                      transition={{duration: 0.2}}>{item.quantity}</motion.p>
                  </AnimatePresence>
                  </div>
                  <button onClick={() => handleIncrement(item)} className='hover:opacity-70 p-2'>+</button>
                  {/* <p>remove</p> */}
                </div>
            </div>)}
            </div>
            {/* <SheetFooter className='mt-auto mb-10 self-start'> */}
              <div className='flex flex-col border-t mt-auto mb-10'>
                <div className='flex gap-4 items-center justify-between my-4 text-xl font-semibold text-[#202223]'>
                  <p>Total</p>
                  <p>{total}</p>
                </div>
                <SheetClose asChild>
                  <Link href={`/checkout`} className='bg-[#C75828] p-4 rounded-[50px] font-semibold text-white text-center w-72 mx-auto mt-auto'>Checkout</Link>
                </SheetClose>
              </div>
            {/* </SheetFooter> */}
          </div>
          :
          <div className='flex flex-col gap-2 items-center justify-center h-full'>
            <h3 className='text-center text-2xl font-semibold'>Your cart is empty</h3>
            <Link href={`rackets`} className='bg-[#C75828] p-4 rounded-[50px] font-semibold text-white text-center'>Continue shopping</Link>
          </div>
          }
      </SheetContent>
    </Sheet>
  )
}

export default CartButton