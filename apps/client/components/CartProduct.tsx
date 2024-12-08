import CartItem from '@/types/cart-item'
import ProductNameLink from './ProductNameLink'
import { egp } from '@/utils/price-formatter'
import { capitalizeFirstChar } from '@/utils/capitalize-first-char'

type CartProductProps = {
    item: CartItem
}

const CartProduct = ({ item }: CartProductProps) => {
  return (
    <div className='flex gap-6 items-center my-4'>
        <img src={item.image} alt='item-image' className='w-24' />
        <div className='flex flex-col md:flex-row w-full'>
            <div>
                <ProductNameLink productId={item.id} name={item.name} />
                <p className='text-sm'>LE <span className='ml-1'>{egp.format(item.price)}</span></p>
                {item.gripSize && <p className='text-xs'>Grip: {item.gripSize}</p>}
                {item.stringOption && <p className='text-xs'>String: {item.stringOption}</p>}
                {item.size && <p className='text-xs'>Size: {item.size}</p>}
                {item.type && <p className='text-xs'>{capitalizeFirstChar(item.type)}</p>}
            </div>
        </div>    
    </div>
  )
}

export default CartProduct