import React from 'react'
import CartIcon from '@/icons/cart-outline.svg'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'

const CartButton = () => {
    const { items, numOfItems } = useCart()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='relative'>
          <motion.div key={numOfItems} 
          initial={{scale: 0.7}} animate={{scale: 1}} transition={{duration: 0.1}} 
          >
          <Badge className={`absolute -top-4 ${numOfItems > 0? "bg-[#C75828]" : "bg-transparent"}`}>{numOfItems}</Badge>
        </motion.div>
        <button className='flex flex-col items-center text-sm hover:text-[#C75828] transition-colors duration-100 ease-in-out'><CartIcon className='w-6' /></button>
      </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
          {items.length > 0? items.map(item => <div key={item.id} className='flex gap-2 items-center'>
            <img src={item.image} alt='item-image' className='w-24' />
            <div>
              <p>{item.name}</p>
              <p className='text-sm'>{item.price} LE</p>
              {item.gripSize && <p className='text-xs'>Grip: {item.gripSize}</p>}
              {item.stringOption && <p className='text-xs'>String: {item.stringOption}</p>}
              {item.size && <p className='text-xs'>Size: {item.size}</p>}
              {item.type && <p className='text-xs'>{item.type}</p>}
            </div>
            <div className='flex flex-col gap-2 ml-auto mr-4 text-xs '>
              <div className='border border-zinc-300 rounded-md py-1 px-2 text-center mx-2'>{item.quantity}</div>
              <p>remove</p>
            </div>
          </div>)
          :
          <div className='flex flex-col gap-2 items-center justify-center h-full'>
            <h3 className='text-center text-2xl font-semibold'>Your cart is empty</h3>
            <Link href={`rackets`} className='bg-[#C75828] p-4 rounded-[50px] font-semibold text-white text-center'>Continue shopping</Link>
          </div>
          }
          {items.length > 0 && <SheetFooter>
          <SheetClose asChild>
            <Link href={`checkout`} className='bg-[#C75828] p-4 rounded-[50px] font-semibold text-white text-center'>Checkout</Link>
          </SheetClose>
        </SheetFooter>}
        
      </SheetContent>
    </Sheet>
    
  )
}

export default CartButton