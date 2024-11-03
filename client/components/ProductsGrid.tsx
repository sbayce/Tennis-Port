"use client"
import DiameterIcon from '@/icons/diameter-head.svg'
import StringsIcon from '@/icons/racket-strings.svg'
import WeightIcon from '@/icons/weight.svg'
import { useCart } from '@/contexts/CartContext'
import Item from '@/contexts/types/item'
import WilsonRedIcon from '@/icons/wilson-red.svg'
import { useState } from 'react'
import { motion } from 'framer-motion'

type ProductsGridProps = {
    products: any[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
    const cartCtx = useCart()
    const [isHover, setIsHover] = useState<string | null>(null)
    function handleAdd(product: Item) {
        cartCtx?.addItem(product)
    }
    console.log(cartCtx?.items)
    console.log("hover: ", isHover)
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 w-full shrink">
        {products.map(product =>
            <div key={product.name} className="flex flex-col xl:flex-col gap-4 items-center cursor-pointer">
                <div className='relative w-full h-full overflow-hidden' onMouseOver={() => setIsHover(product.name)} onMouseOut={() => setIsHover(null)}>
                    <motion.img initial={{opacity: 1}} animate={{ opacity: isHover === product.name ? 0 : 1 }} transition={{duration: 0.1}} className={`w-full h-full max-h-[100%] max-w-[100%] object-cover`}
                            src={product.image}
                            alt="product-img"
                    />
                    <motion.img initial={{opacity: 0}} animate={{ opacity: isHover === product.name ? 1 : 0 }} transition={{duration: 0.1}} className={`w-full h-full max-h-[100%] max-w-[100%] object-cover absolute top-0`}
                            src={product.image2}
                            alt="product-img"
                    />
                </div>
                {/* <img className="w-full h-full max-h-[100%] max-w-[100%] object-cover" src={isHover === product.name? imgUrl: product.image} alt="product-img" /> */}
                <div className="flex flex-col gap-0 w-full items-center xl:items-center relative">
                    {product.brand}
                    {/* <WilsonRedIcon className="w-20 h-20" /> */}
                    <p className="text-zinc-900 text-md font-semibold">{product.name}</p>
                    <p className="text-sm font-semibold">{product.type}</p>
                    <p className="text-lg font-bold text-gray-700">{product.price} <span className="text-sm">EGP</span></p>
                    <div className="flex items-center text-xs text-gray-500 absolute right-0 -top-16">
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
                    <button onClick={() => handleAdd(product)} className='border rounded-md p-2'>Add to cart</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductsGrid