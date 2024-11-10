"use client"
import { createContext, ReactNode, useState, useContext } from "react"
import Item from "@/contexts/types/item";

type CartContextType = {
    items: Item[]; // Replace `any` with a more specific type if possible
    total: number;
    numOfItems: number;
    addItem: Function;
    removeItem: Function
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setNumOfItems: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType>({
    items: [],
    total: 0,
    numOfItems: 0,
    addItem: () => {},
    removeItem: () => {},
    setItems: () => {},
    setTotal: () => {},
    setNumOfItems: () => {},
})

export function useCart() {
    return useContext(CartContext)
}

type Props = {
    children: ReactNode;
};

const CartContextProvider = ({ children }: Props) => {
    const [items, setItems] = useState<Item[]>([])
    const [total, setTotal] = useState(0)
    const [numOfItems, setNumOfItems] = useState(0)

    function addItem(item: Item) {
        const itemIndex = items.findIndex(foundItem => foundItem.id === item.id)
        console.log("index: ", itemIndex)
        if(itemIndex === -1) {
            item.quantity = 1
            setItems(prev => [...prev, item])
        }else{
            setItems(prev => {
                const updatedItems = [...prev]
                updatedItems[itemIndex].quantity = updatedItems[itemIndex].quantity + 1
                return updatedItems
            })
        }
        setNumOfItems(prev => prev+1)
        setTotal(prev => prev + item.price)
    }
    function removeItem(id: string) {
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

    return (
        <CartContext.Provider value={{items, total, numOfItems, addItem, removeItem, setItems, setTotal, setNumOfItems}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider