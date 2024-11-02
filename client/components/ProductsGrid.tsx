"use client"
import DiameterIcon from '@/icons/diameter-head.svg'
import StringsIcon from '@/icons/racket-strings.svg'
import WeightIcon from '@/icons/weight.svg'
import { useCart } from '@/contexts/CartContext'
import Item from '@/contexts/types/item'
import BabolatIcon from '@/icons/wilson.svg'

type ProductsGridProps = {
    products: any[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
    const cartCtx = useCart()
    function handleAdd(product: Item) {
        cartCtx?.addItem(product)
    }
    console.log(cartCtx?.items)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
        {products.map(product =>
            <div key={product.name} className="border rounded-sm 2xl:p-6 flex flex-col xl:flex-col gap-4 items-center">
                <img className="w-24 2xl:w-80 h-24 2xl:h-80" src={product.image} alt="product-img" />
                <div className="flex flex-col gap-4 w-full items-center xl:items-center">
                    <BabolatIcon className="w-20" />
                    {/* <img className="w-14" src={product.brand} alt="product-brand" /> */}
                    <p className="text-zinc-900 text-xl">{product.name}</p>
                    <p className="text-sm font-semibold">{product.type}</p>
                    <p className="text-lg font-bold text-gray-700">{product.price} <span className="text-sm">EGP</span></p>
                    {/* <p>{product.rating}</p> */}
                    <div className="flex gap-2 items-center text-sm text-gray-500">
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