'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { racketBrands } from "@/app/page"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

const BrandList = () => {
    const [search, setSearch] = useState('')
    const searchResults = racketBrands.filter((racketBrand) => racketBrand.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  return (
    <>
        <h3 className="font-semibold mb-2">Racket Brands</h3>
        <input onChange={(e) => setSearch(e.target.value)} type="text" className="border p-2 w-40 mb-2" placeholder="Search by brand." />
        <ScrollArea className="h-60 w-48">
            <div className="px-4">
                {searchResults.map((racketBrand) => (
                    <div key={racketBrand} className="flex items-center justify-between mb-2">
                        <label
                            htmlFor={racketBrand}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {racketBrand}
                        </label>
                        <Checkbox className="w-6 h-6" id={racketBrand} />
                    </div>
                ))}
            </div>
        </ScrollArea>
    </>
  )
}

export default BrandList