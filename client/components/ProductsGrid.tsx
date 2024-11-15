"use client"
import DiameterIcon from '@/icons/diameter-head.svg'
import StringsIcon from '@/icons/racket-strings.svg'
import { Weight } from "lucide-react"
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Product from '@/types/product'
import Link from 'next/link'
import CartItem from '@/types/cart-item'

type ProductsGridProps = {
    products: Product[],
    isLoading: boolean
}

const fadeInVariant = {
    hidden: {
        opacity: 0,
        y: 10
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            damping: 10,
            delay: index * 0.05
        }
    })
}

const ProductsGrid = ({ products, isLoading }: ProductsGridProps) => {
    const cartCtx = useCart()
    const [isImageHovered, setIsImageHovered] = useState<string | null>(null)
    const [isHovered, setIsHovered] = useState<string | null>(null)
    const handleAdd = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        event.preventDefault()
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image,
            price: product.price,
            quantity: 1,
            gripSize: "2",
            stringOption: "unstrung"
        }
        cartCtx?.addItem(cartItem)
    }
    console.log(cartCtx?.items)
    console.log("hover: ", isImageHovered)
    console.log("loading: ", isLoading)
    if(products.length === 0 && !isLoading) return <h1 className='text-center text-2xl font-semibold'>No products found</h1>
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-14 w-full ${isLoading && "opacity-40"}`}>
        {products.map((product, index) =>
        <Link key={product.id} href={`product/${product.id}`}>
            <motion.div key={product.name} variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index} className="flex flex-col xl:flex-col gap-4 items-center cursor-pointer" onMouseOver={() => setIsHovered(product.name)} onMouseLeave={() => setIsHovered(null)}>
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
                            <p>{product.racket?.headSize}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <StringsIcon className='w-8 h-8' />
                            <p>{product.racket?.pattern}</p>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Weight className='w-8 h-8' strokeWidth={1} />
                            <p>{product.racket?.weight}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-0 w-full items-center xl:items-center relative text-center">
                    {product.brand}
                    <p className="text-zinc-900 text-md font-semibold">{product.name}</p>
                    <p className="text-sm font-semibold">{product.racket?.type}</p>
                    <p className="text-lg font-bold text-gray-700">{product.price} <span className="text-sm">EGP</span></p>
                    
                    <motion.button 
                        initial={{opacity: 0}} 
                        transition={{damping: 10, duration: 0.2}} 
                        animate={{opacity: isHovered === product.name? 1 : 0, y: isHovered === product.name? 0 : 5}} 
                        onClick={(e) => handleAdd(product, e)} 
                        className='border font-semibold mt-2 text-sm bg-[#C75828] text-white hover:bg-transparent
                        hover:text-[#C75828] border-[#C75828] p-2 rounded-xl'>
                            Add to cart
                    </motion.button>
                </div>
            </motion.div>
            </Link>
        )}
    </div>
  )
}

export default ProductsGrid