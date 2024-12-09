"use client"
import { motion } from 'framer-motion'
import { Shoe } from '@/types/shoe'
import Link from 'next/link'
import CartItem from '@/types/cart-item'
import RacketInformation from './RacketInformation'
import { Racket } from '@/types/racket'
import { isRacket } from '@/types/product'
import { ShoppingBasket } from 'lucide-react'
import { egp } from '@/utils/price-formatter'
import { capitalizeFirstChar } from '@/utils/capitalize-first-char'
import { useCallback } from 'react'
import { useCartStore } from '@/store/store'

type ProductsGridProps = {
    products: Racket[] | Shoe[],
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
    const addItemToStore = useCartStore(state => state.addItem)
    const handleAdd = useCallback((product: Racket | Shoe, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        event.preventDefault()
        const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image,
            price: product.price,
            quantity: 1,
        }
        if(isRacket(product)) {
            cartItem.gripSize = "2"
            cartItem.stringOption = "unstrung"
        }else{
            cartItem.size = product.shoe?.size[0]
            cartItem.type = product.shoe?.type
        }
        addItemToStore(cartItem)
    }, [])
    if(products.length === 0 && !isLoading) return <h1 className='text-center text-2xl font-semibold'>No products found</h1>
  return (
    <div className={`px-4 grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-14 w-full ${isLoading && "opacity-40"}`}>
        {products.map((product, index) =>
        <Link key={product.id} href={`product/${product.id}`}>
            <motion.div key={product.name} variants={fadeInVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index} className="flex flex-col xl:flex-col gap-4 items-center cursor-pointer group">
                <div className='relative w-full h-full overflow-hidden group'>
                    <img className={`w-full h-full max-h-[100%] max-w-[100%] object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-200`}
                        src={product.image}
                        alt="product-img"
                    />
                    <img className={`w-full h-full max-h-[100%] max-w-[100%] object-cover absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                        src={product.image2}
                        alt="product-img"
                    />
                    {isRacket(product) && <RacketInformation racket={product.racket} />}
                    {!isRacket(product) && product.shoe && <p className='absolute right-auto xl:right-0 bottom-0 bg-[#202223] text-white text-[10px] sm:text-xs rounded-sm px-1'>{capitalizeFirstChar(product.shoe.type)}</p>}
                    <button onClick={(e) => handleAdd(product, e)}  className='absolute right-0 bottom-0 md:hidden border border-gray-300 px-1 rounded-full'>
                        <ShoppingBasket className='stroke-gray-600 w-4' />
                    </button>
                </div>
                <div className="flex flex-col gap-0 w-full items-center xl:items-center relative text-center">
                    <p className='text-xs md:text-sm'>{product.brand}</p>
                    <p className="text-zinc-900 text-sm md:text-base font-semibold">{product.name}</p>
                    {isRacket(product) && <p className="text-sm font-semibold">{product.racket?.type}</p>}
                    <p className="text-sm md:text-base text-gray-500">{egp.format(product.price)} <span className="text-sm">EGP</span></p>
                    
                    <button 
                        onClick={(e) => handleAdd(product, e)} 
                        className='border font-semibold mt-2 text-sm bg-[#C75828] opacity-0 group-hover:opacity-100 hidden md:flex transition-all duration-300 translate-y-2
                         group-hover:translate-y-0 text-white hover:bg-transparent
                        hover:text-[#C75828] border-[#C75828] p-2 rounded-xl'>
                            Add to cart
                    </button>
                </div>
            </motion.div>
            </Link>
        )}
    </div>
  )
}

export default ProductsGrid