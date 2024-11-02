import NavMenu from "@/components/NavMenu";
import MainDisplay from "@/components/MainDisplay";
import SideBar from "@/components/SideBar";
import ProductsGrid from "@/components/ProductsGrid";
import BabolatIcon from '@/icons/babolat-logo-vector.svg'
import WilsonIcon from '@/icons/wilson.svg'
import ActiveFilters from "@/components/ActiveFilters";

export const racketTypes: string[] = [
  "Allround",
  "Comfort",
  "Junior",
  "Tour"
]
export const racketBrands: any[] = [
  {
    brand: "Babolat",
    logo: <BabolatIcon className='w-12' />
  },
  {
    brand: "Dunlop",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Head",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Lacoste",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Prince",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "PROKENNEX",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Racket Roots",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Tecnifibre",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Wilson",
    logo: <WilsonIcon className='w-12' />
  },
  {
    brand: "Yonex",
    logo: <WilsonIcon className='w-12' />
  },
]

const RACKET_DATA = [
  {
    id: 1,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Tour",
    name: "Pure Drive Wimbledon Tour",
    price: 9000,
    rating: 4.9,
    width: 645,
    height: "16/19",
    weight: 300
  },
  {
    id: 2,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Junior",
    name: "Alo Drive Junior",
    price: 11000,
    rating: 4.9,
    width: 630,
    height: "16/19",
    weight: 240
  },
  {
    id: 3,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Elite",
    price: 13999,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 4,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Pro",
    price: 15000,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 5,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Classic",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 6,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Plus",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 7,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Ultimate",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 8,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Power",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 9,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Supreme",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 10,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Ace",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 11,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Grand",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 12,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Champion",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 13,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Master",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 14,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Fusion",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 15,
    image: "https://www.babolat.ca/cdn/shop/files/101516-Pure_Drive_Wimbledon-100-1-Face.png?v=1715871758",
    brand: "https://logovectorseek.com/wp-content/uploads/2021/05/babolat-logo-vector.png",
    type: "Allround",
    name: "Nadal Racket Evolution",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  }
];



export default function Home() {
  return (
    <>
      <MainDisplay />
      <NavMenu />
      <ActiveFilters />
      <div className="flex gap-2">
        <SideBar />
        <ProductsGrid products={RACKET_DATA} />
      </div>
    </>
  );
}
