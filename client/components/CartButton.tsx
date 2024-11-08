import React from 'react'
import CartIcon from '@/icons/cart-outline.svg'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"

const CartButton = () => {
    const cartCtx = useCart()
  return (
    <div className='mt-6'>
        {cartCtx?.numOfItems !== 0 && (
          <motion.div key={cartCtx?.numOfItems} 
          initial={{scale: 0.7}} animate={{scale: 1}} transition={{duration: 0.1}} 
          >
           <Badge className='bg-[#C75828]'>{cartCtx?.numOfItems}</Badge>
        </motion.div>
            // <motion.div key={cartCtx?.numOfItems} 
            //     initial={{scale: 0}} animate={{scale: 1}} transition={{duration: 0.1}} 
            //     className='rounded-full w-4 h-4.5  font-semibold text-[11px] bg-[#C75828] text-center ml-6 text-white'>
            //         {cartCtx?.numOfItems}
            // </motion.div>
    )}
        <button className='flex flex-col items-center px-2 pb-2 text-sm hover:text-yellow-500 transition-colors duration-100 ease-in-out'><CartIcon className='w-6' />Cart</button>
    </div>
  )
}

export default CartButton