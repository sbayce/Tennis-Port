"use client"
import MainDisplay from "@/components/MainDisplay";
import SideBar from "@/components/SideBar";
import ProductsGrid from "@/components/ProductsGrid";
import ActiveFilters from "@/components/ActiveFilters";
import BabolatIcon from '@/icons/babolat-logo-vector.svg'
import WilsonRedIcon from '@/icons/wilson-red.svg'
import DunlopIcon from '@/icons/dunlop.svg'
import HeadIcon from '@/icons/head.svg'
import LacosteIcon from '@/icons/lacoste.svg'
import PrinceIcon from '@/icons/prince.svg'
import ProkennexIcon from '@/icons/PROKENNEX.svg'
import TecnifibreIcon from '@/icons/tecnifibre.svg'
import YonexIcon from '@/icons/yonex.svg'
import SortMenu from "@/components/SortMenu";
import PaginationTab from "@/components/PaginationTab";
import trpc from "@/trpcClient"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Product from "@/types/product";

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



export default function Home() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const brand = searchParams.getAll("brand").length > 0? searchParams.getAll("brand") : undefined
  const type = searchParams.getAll("type").length > 0? searchParams.getAll("type") : undefined
  const weight = searchParams.getAll("weight").length > 0? searchParams.getAll("weight") : undefined
  const minPrice = searchParams.get("price.min")?? undefined
  const min = minPrice? Number(minPrice) : undefined
  const maxPrice = searchParams.get("price.max")?? undefined
  const max = maxPrice? Number(maxPrice) : undefined
  const sort = searchParams.get("sort") || undefined
  const [rackets, setRackets] = useState<Product[]>([])

  const fetchRackets = async() => {
    const racketData = await trpc.getRackets.query({page, filter: {brand, type, weight, price: {min, max}}, sort}) || []
    setRackets(racketData)
  }

  useEffect(() => {
    fetchRackets()
  }, [searchParams])

  console.log("racket data: ", rackets)
  return (
    <>
      <MainDisplay />
      <div className="flex gap-2">
        <SideBar />
        <div className="flex flex-col gap-8 mb-20">
          <div className="flex justify-between mt-4">
            <ActiveFilters />
            <SortMenu />
          </div>
          <ProductsGrid products={rackets} />
          <PaginationTab />
        </div>
      </div>
    </>
  );
}
