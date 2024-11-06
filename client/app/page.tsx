"use client"
import NavMenu from "@/components/NavMenu";
import MainDisplay from "@/components/MainDisplay";
import SideBar from "@/components/SideBar";
import ProductsGrid from "@/components/ProductsGrid";
import ActiveFilters from "@/components/ActiveFilters";
import BabolatIcon from '@/icons/babolat-logo-vector.svg'
import WilsonIcon from '@/icons/wilson.svg'
import WilsonRedIcon from '@/icons/wilson-red.svg'
import DunlopIcon from '@/icons/dunlop.svg'
import HeadIcon from '@/icons/head.svg'
import LacosteIcon from '@/icons/lacoste.svg'
import PrinceIcon from '@/icons/prince.svg'
import ProkennexIcon from '@/icons/PROKENNEX.svg'
import TecnifibreIcon from '@/icons/tecnifibre.svg'
import YonexIcon from '@/icons/yonex.svg'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useState } from "react";
import SortMenu from "@/components/SortMenu";

export const racketTypes: string[] = [
  "Allround",
  "Comfort",
  "Junior",
  "Tour"
]
export const racketWeights: string[] = [
  "170",
  "180",
  "190",
  "200",
  "210",
  "220",
  "230",
  "240",
  "250",
  "260",
  "270",
  "280",
  "290",
  "300",
  "310"

]
export const racketBrands: any[] = [
  {
    brand: "Babolat",
    logo: <BabolatIcon className='w-12 h-12' />
  },
  {
    brand: "Dunlop",
    logo: <DunlopIcon className='w-12 h-12' />
  },
  {
    brand: "Head",
    logo: <HeadIcon className='w-12 h-12' />
  },
  {
    brand: "Lacoste",
    logo: <LacosteIcon className='w-12 h-12' />
  },
  {
    brand: "Prince",
    logo: <PrinceIcon className='w-12 h-12' />
  },
  {
    brand: "PROKENNEX",
    logo: <ProkennexIcon className='w-12 h-12' />
  },
  {
    brand: "Tecnifibre",
    logo: <TecnifibreIcon className='w-12 h-12' />
  },
  {
    brand: "Wilson",
    logo: <WilsonRedIcon className='w-12 h-12' />
  },
  {
    brand: "Yonex",
    logo: <YonexIcon className='w-12 h-12' />
  },
]

const RACKET_DATA = [
  {
    id: 1,
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <WilsonRedIcon className='w-20 h-20' />,
    type: "Junior",
    name: "Clash 100 Pro V2",
    price: 11000,
    rating: 4.9,
    width: 630,
    height: "16/19",
    weight: 240
  },
  {
    id: 3,
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR109111U_/WR109111U__e1e493c0467a45f9b9d84706f66e1f80.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR109011U_/WR109011U__b9c996eba83e5dc6dd366cba4b93515e.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=375&height=458&canvas=375%2C458&bg-color=f5f5f5",
    brand: <WilsonRedIcon className='w-20 h-20' />,
    type: "Allround",
    name: "Burn 100 V5",
    price: 13999,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 4,
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR150111U_/WR150111U__023b8928146537742f92e61184680acf.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=375&height=458&canvas=375%2C458&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR151511U_/WR151511U__44f7ada4ab2299407ebf2451256509a5.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <WilsonRedIcon className='w-20 h-20' />,
    type: "Allround",
    name: "Blade 100L V9",
    price: 15000,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 5,
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR151311U_/WR151311U__2cb4e2aa3b9b83f7dd1dae1589b8937b.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR151311U_/WR151311U__a93b3d62b2519f4b4bc921772db2b61e.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=375&height=458&canvas=375%2C458&bg-color=f5f5f5",
    brand: <WilsonRedIcon className='w-20 h-20' />,
    type: "Allround",
    name: "RF 01 Pro",
    price: 500,
    rating: 5,
    width: 645,
    height: "16/19",
    weight: 305
  },
  {
    id: 6,
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
    image: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074311U_/WR074311U__947e55f0cb46856d1f5cc48543781b9c.png?dpr=2&fit=bounds&orient=1&quality=90&optimize=high&format=pjpg&auto=webp&enable=upscale&width=1912&height=962&bg-color=f5f5f5",
    image2: "https://www.wilson.com/en-us/media/catalog/product/article_images/WR074111U_/WR074111U__aa6e7f8951545eb2b2fb25f27546f8d2.png?dpr=1&fit=bounds&orient=1&quality=95&optimize=high&format=pjpg&auto=webp&enable=upscale&width=778&height=950&canvas=778%2C950&bg-color=f5f5f5",
    brand: <BabolatIcon className='w-20 h-20' />,
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
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Ensures the component has mounted before rendering based on screen size
  }, []);

  const isLgOrLarger = useMediaQuery({minWidth: 1000})
  return (
    <>
      <MainDisplay />
      <NavMenu />
      <div className="flex gap-2">
        { hasMounted && isLgOrLarger && <SideBar /> }
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <ActiveFilters />
            <SortMenu />
          </div>
          <ProductsGrid products={RACKET_DATA} />
        </div>
      </div>
    </>
  );
}
