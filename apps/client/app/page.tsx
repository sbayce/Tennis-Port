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
  const [rackets, setRackets] = useState<Racket[]>([])
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchRackets = async() => {
    const { racketData, numOfPages } = await trpc.getRackets.query({page, filter: {brand, type, weight, price: {min, max}}, sort}) || []
    setIsLoading(false)
    setRackets(racketData)
    setNumOfPages(numOfPages)
  }

  useEffect(() => {
    fetchRackets()
    setIsLoading(true)
  }, [searchParams])

  console.log("racket data: ", rackets)
  return (
    <>
      <MainDisplay />
      <div className="flex gap-2">
        {/* <SideBar /> */}
        <div className="flex flex-col gap-8 mb-20 w-full">
          <div className="flex justify-between mt-4">
            <ActiveFilters />
            {rackets.length > 0 && <SortMenu />}
          </div>
          <ProductsGrid isLoading={isLoading} products={rackets} />
          <PaginationTab numOfPages={numOfPages} />
        </div>
      </div>
    </>
  );
}
