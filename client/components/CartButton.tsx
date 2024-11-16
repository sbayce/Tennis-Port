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
          {items.map(item => <div key={item.id} className='flex gap-2 items-center'>
            <img src={item.image} alt='item-image' className='w-24' />
            <div>
              <p>{item.name}</p>
              <p className='text-sm'>{item.price} LE</p>
              <p className='text-xs'>Grip: {item.gripSize}</p>
              <p className='text-xs'>String: {item.stringOption}</p>
            </div>
            <p className=''>{item.quantity}</p>
          </div>)}
        <SheetFooter>
          <SheetClose asChild>
            <Link href={`checkout`} className='bg-[#C75828]' type="submit">Checkout</Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    
  )
}

export default CartButton