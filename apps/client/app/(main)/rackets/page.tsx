/* eslint-disable */
"use client"
import MainDisplay from "@/components/MainDisplay";
import SideBar from "@/components/SideBar";
import ProductsGrid from "@/components/ProductsGrid";
import ActiveFilters from "@/components/ActiveFilters";
import SortMenu from "@/components/SortMenu";
import PaginationTab from "@/components/PaginationTab";
import trpc from "@/trpcClient"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Racket } from "@/types/racket";

export default function RacketsPage() {
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
  const [rackets, setRackets] = useState<Racket[]>([])
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchRackets = async() => {
    try{
      const { racketData, numOfPages, productCount } = await trpc.getRackets.query({page, filter: {brand, type, weight, price: {min, max}}, sort}) || []
      setIsLoading(false)
      setRackets(racketData)
      setProductCount(productCount)
      setNumOfPages(numOfPages)
    }catch(error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    fetchRackets()
  }, [searchParams])

  return (
    <>
      <div>
        {!isLoading && productCount > 0 && <p className="text-center text-sm mb-4">{productCount} products</p>}
        <ProductsGrid isLoading={isLoading} products={rackets}  />
      </div>
      <PaginationTab numOfPages={numOfPages} />
    </>
  );
}
