import { createContext, ReactNode, useState } from "react"

type Item = {
    name: string,
    type: string,
    brand: string,
    price: number,
    rating: number,
    width: number,
    pattern: string,
    weight: number,
}

type CartContextType = {
    items: Item[]; // Replace `any` with a more specific type if possible
    total: number;
    numOfItems: number;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    setNumOfItems: React.Dispatch<React.SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined)

type Props = {
    children: ReactNode;
};

const CartContextProvider = ({ children }: Props) => {
    const [items, setItems] = useState<Item[]>([])
    const [total, setTotal] = useState(0)
    const [numOfItems, setNumOfItems] = useState(0)

    return (
        <CartContext.Provider value={{items, total, numOfItems, setItems, setTotal, setNumOfItems}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContextProvider