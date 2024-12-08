/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client"
import { createContext, ReactNode, useState, useContext } from "react"
import CartItem from "@/types/cart-item"

type CartContextType = {
    items: CartItem[]
    total: number
    numOfItems: number
    addItem: Function
    removeItem: Function
    deleteItem: Function
    setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
    setTotal: React.Dispatch<React.SetStateAction<number>>
    setNumOfItems: React.Dispatch<React.SetStateAction<number>>
}

export const CartContext = createContext<CartContextType>({
    items: [],
    total: 0,
    numOfItems: 0,
    addItem: () => {},
    removeItem: () => {},
    deleteItem: () => {},
    setItems: () => {},
    setTotal: () => {},
    setNumOfItems: () => {},
})

export function useCart() {
    return useContext(CartContext)
}

type Props = {
    children: ReactNode
}

const CartContextProvider = ({ children }: Props) => {
    const [items, setItems] = useState<CartItem[]>([])
    const [total, setTotal] = useState(0)
    const [numOfItems, setNumOfItems] = useState(0)

    const addItem = (item: CartItem) => {
        const itemIndex = items.findIndex(foundItem => foundItem.id === item.id)
        if(itemIndex === -1) {
            item.quantity = 1
            setItems(prev => [...prev, item])
            setNumOfItems(prev => prev+1)
            setTotal(prev => prev + item.price)
        }else{
            setItems(prev => {
                const updatedItems = [...prev]
                // update product preferences if changed
                if(updatedItems[itemIndex].gripSize !== item.gripSize || updatedItems[itemIndex].stringOption !== item.stringOption) {
                    updatedItems[itemIndex].gripSize = item.gripSize
                    updatedItems[itemIndex].stringOption = item.stringOption
                    return updatedItems
                }
                updatedItems[itemIndex].quantity = updatedItems[itemIndex].quantity + 1
                setNumOfItems(prev => prev+1)
                setTotal(prev => prev + item.price)
                return updatedItems
            })
        }
    }
    const removeItem = (id: string) => {
        const itemIndex = items.findIndex(foundItem => foundItem.id === id)
        if(items[itemIndex].quantity > 1) {
            setItems(prev => {
                const updatedItems = [...prev]
                updatedItems[itemIndex].quantity = updatedItems[itemIndex].quantity - 1
                return updatedItems
            })
        }else{
            setItems(prev => prev.filter(item => item.id !== id))
        }
        setNumOfItems(prev => prev-1)
        setTotal(prev => prev - items[itemIndex].price)
    }
    const deleteItem = (id: string) => {
        const itemIndex = items.findIndex(foundItem => foundItem.id === id)
        const quantity = items[itemIndex].quantity
        setItems(prev => prev.filter(item => item.id !== id))
        setNumOfItems(prev => prev-quantity)
        setTotal(prev => prev - items[itemIndex].price*quantity)
    }

    return (
        <CartContext.Provider value={{items, total, numOfItems, addItem, removeItem, deleteItem, setItems, setTotal, setNumOfItems}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider