import React from 'react'
import CartIcon from '@/icons/cart-outline.svg'
import { useCart } from '@/contexts/CartContext'
import { motion } from 'framer-motion'

const CartButton = () => {
    const cartCtx = useCart()
  return (
    <div>
        {cartCtx?.numOfItems !== 0 && (
            <motion.div key={cartCtx?.numOfItems} 
                initial={{scale: 0}} animate={{scale: 1}} transition={{duration: 0.1}} 
                className='rounded-full w-4.5 h-4.5 font-semibold text-[11px] bg-[#CCFF00] text-center ml-6'>
                    {cartCtx?.numOfItems}
            </motion.div>
    )}
        <button className='flex flex-col items-center px-2 pb-2 text-sm hover:text-yellow-500 transition-colors duration-100 ease-in-out'><CartIcon className='w-6' />Cart</button>
    </div>
  )
}

export default CartButton