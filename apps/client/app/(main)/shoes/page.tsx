/* eslint-disable */
"use client"
import ProductsGrid from "@/components/ProductsGrid";
import PaginationTab from "@/components/PaginationTab";
import trpc from "@/trpcClient"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Shoe } from "@/types/shoe";

export default function ShoesPage() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const brand = searchParams.getAll("brand").length > 0? searchParams.getAll("brand") : undefined
  const type = searchParams.getAll("type").length > 0? searchParams.getAll("type").map(type => type.toUpperCase()) as ("MALE" | "FEMALE" | "UNISEX")[] : undefined
  const size = searchParams.getAll("size").length > 0? searchParams.getAll("size") : undefined
  const minPrice = searchParams.get("price.min")?? undefined
  const min = minPrice? Number(minPrice) : undefined
  const maxPrice = searchParams.get("price.max")?? undefined
  const max = maxPrice? Number(maxPrice) : undefined
  const sort = searchParams.get("sort") || undefined
  const [shoes, setShoes] = useState<Shoe[]>([])
  const [numOfPages, setNumOfPages] = useState<number>(0)
  const [productCount, setProductCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchShoes = async() => {
    try{
      const { shoesData, numOfPages, productCount } = await trpc.getShoes.query({page, filter: {brand, type, size, price: {min, max}}, sort}) || []
      setIsLoading(false)
      setShoes(shoesData)
      setProductCount(productCount)
      setNumOfPages(numOfPages)
    }catch(error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchShoes()
    setIsLoading(true)
  }, [searchParams])

  console.log("shoes data: ", shoes)
  return (
    <>
      <div>
        {!isLoading && productCount > 0 && <p className="text-center text-sm mb-4">{productCount} products</p>}
        <ProductsGrid isLoading={isLoading} products={shoes} />
      </div>
      <PaginationTab numOfPages={numOfPages} />
    </>
  );
}
