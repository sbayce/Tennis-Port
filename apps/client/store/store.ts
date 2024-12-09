import { create } from 'zustand'
import CartItem from '@/types/cart-item'

type CartStoreType = {
    items: CartItem[]
    total: number
    numOfItems: number
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    deleteItem: (id: string) => void
}

export const useCartStore = create<CartStoreType>((set) => ({
    items: [],
    total: 0,
    numOfItems: 0,
    addItem: (item: CartItem) => {
        set(state => {
            const itemIndex = state.items.findIndex(foundItem => foundItem.id === item.id)
            if(itemIndex === -1) {
                return {
                    items: [...state.items, {...item, quantity: 1}],
                    numOfItems: state.numOfItems + 1,
                    total: state.total + item.price
                }
            }else{
                const updatedItems = state.items.map((cartItem, index) =>
                    index === itemIndex? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
                return {
                    items: updatedItems,
                    numOfItems: state.numOfItems + 1,
                    total: state.total + item.price
                }
            }
        })
    },
    removeItem: (id: string) => {
        set(state => {
            const itemIndex = state.items.findIndex(foundItem => foundItem.id === id)
            if(state.items[itemIndex].quantity > 1) {
                const updatedItems = state.items.map((cartItem, index) =>
                    index === itemIndex? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                )
                return {
                    items: updatedItems,
                    numOfItems: state.numOfItems - 1,
                    total: state.total - state.items[itemIndex].price
                }
            }else{
                return {
                    items: state.items.filter(item => item.id !== id),
                    numOfItems: state.numOfItems - 1,
                    total: state.total - state.items[itemIndex].price
                }
            }
        })
    },
    deleteItem: (id: string) => {
        set(state => {
            const itemIndex = state.items.findIndex(foundItem => foundItem.id === id)
            if (itemIndex === -1) {
                return state
            }
            const quantity = state.items[itemIndex].quantity
            const price = state.items[itemIndex].price
            return {
                items: state.items.filter(item => item.id !== id),
                numOfItems: state.numOfItems - quantity,
                total: state.total - price * quantity
            }
        })
    },
}))