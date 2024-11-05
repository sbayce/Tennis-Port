"use client"
import DiameterIcon from '@/icons/diameter-head.svg'
import StringsIcon from '@/icons/racket-strings.svg'
import WeightIcon from '@/icons/weight.svg'
import { useCart } from '@/contexts/CartContext'
import Item from '@/contexts/types/item'
import { useState } from 'react'
import { motion } from 'framer-motion'

type ProductsGridProps = {
    products: any[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
    const cartCtx = useCart()
    const [isImageHovered, setIsImageHovered] = useState<string | null>(null)
    const [isHovered, setIsHovered] = useState<string | null>(null)
    function handleAdd(product: Item) {
        cartCtx?.addItem(product)
    }
    console.log(cartCtx?.items)
    console.log("hover: ", isImageHovered)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-14 w-full">
        {products.map(product =>
            <div key={product.name} className="flex flex-col xl:flex-col gap-4 items-center cursor-pointer" onMouseOver={() => setIsHovered(product.name)} onMouseLeave={() => setIsHovered(null)}>
                <div className='relative w-full h-full overflow-hidden' onMouseOver={() => setIsImageHovered(product.name)} onMouseLeave={() => setIsImageHovered(null)}>
                    <motion.img initial={{opacity: 1}} animate={{ opacity: isImageHovered === product.name ? 0 : 1 }} transition={{duration: 0.1}} className={`w-full h-full max-h-[100%] max-w-[100%] object-cover`}
                            src={product.image}
                            alt="product-img"
                    />
                    <motion.img initial={{opacity: 0}} animate={{ opacity: isImageHovered === product.name ? 1 : 0 }} transition={{duration: 0.1}} className={`w-full h-full max-h-[100%] max-w-[100%] object-cover absolute top-0`}
                            src={product.image2}
                            alt="product-img"
                    />
                    <div className="flex xl:flex-row flex-col items-center text-xs text-gray-500 absolute right-auto xl:right-0 bottom-0">
                        <div className='flex flex-col items-center'>
                            <DiameterIcon className='w-8 h-8' />
                            <p>{product.width}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <StringsIcon className='w-8 h-8' />
                            <p>{product.height}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <WeightIcon className='w-8 h-8' />
                            <p>{product.weight}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full items-center xl:items-center relative text-center">
                    {product.brand}
                    <p className="text-zinc-900 text-md font-semibold">{product.name}</p>
                    <p className="text-sm font-semibold">{product.type}</p>
                    <p className="text-lg font-bold text-gray-700">{product.price} <span className="text-sm">EGP</span></p>
                    
                    <motion.button 
                        initial={{opacity: 0}} 
                        transition={{damping: 10, duration: 0.2}} 
                        animate={{opacity: isHovered === product.name? 1 : 0, y: isHovered === product.name? 0 : 5}} 
                        onClick={() => handleAdd(product)} 
                        className='border font-semibold mt-2 text-sm hover:bg-[#C75828]
                        hover:text-white border-[#C75828] text-[#C75828] p-2 rounded-xl'>
                            Add to cart
                    </motion.button>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductsGrid