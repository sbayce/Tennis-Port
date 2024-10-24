import NavMenu from "@/components/NavMenu";
import MainDisplay from "@/components/MainDisplay";
import SideBar from "@/components/SideBar";
import ProductsGrid from "@/components/ProductsGrid";

export const racketTypes: string[] = [
  "Allround",
  "Comfort",
  "Junior",
  "Tour"
]
export const racketBrands: string[] = [
  "Babolat",
  "Dunlop",
  "Head",
  "Lacoste",
  "Prince",
  "PROKENNEX",
  "Racket Roots",
  "Tecnifibre",
  "Wilson",
  "Yonex",
  "All brands"
]

const RACKET_DATA = [
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Tour",
    name: "Pure Drive Wimbeldon",
    price: 199,
    rating: 4.9,
    width: 645,
    height: "16/19",
    weight: 300
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Junior",
    name: "Alo Drive",
    price: 23,
    rating: 4.9,
    width: 630,
    height: "16/19",
    weight: 240
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal racket",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal racket",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal racket",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal racket",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal racket",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal racket",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
]

export default function Home() {
  return (
    <>
      <MainDisplay />
      <NavMenu />
      <div className="flex gap-2">
        <SideBar />
        <ProductsGrid products={RACKET_DATA} />
      </div>
    </>
  );
}
