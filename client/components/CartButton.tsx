import React from 'react'
import CartIcon from '@/icons/cart-outline.svg'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const CartButton = () => {
    const { items, numOfItems, total } = useCart()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className=''>
          <motion.div key={numOfItems} 
          initial={{scale: 0.7}} animate={{scale: 1}} transition={{duration: 0.1}} 
          >
            {numOfItems !== 0 && <Badge className='bg-[#C75828]'>{numOfItems}</Badge>}
        </motion.div>
        <button className='flex flex-col items-center px-2 pb-2 text-sm hover:text-[#C75828] transition-colors duration-100 ease-in-out'><CartIcon className='w-6' />Cart</button>
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
            <Button className='bg-[#C75828]' type="submit">Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    
  )
}

export default CartButton