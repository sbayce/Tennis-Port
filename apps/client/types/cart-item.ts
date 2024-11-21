import { ShoeGender } from "./shoe"

type CartItem = {
    id: string,
    name: string,
    image: string,
    brand: string,
    quantity: number,
    price: number,
    gripSize?: string
    stringOption?: string
    size?: string
    type?: typeof ShoeGender[keyof typeof ShoeGender]
}
export default CartItem
