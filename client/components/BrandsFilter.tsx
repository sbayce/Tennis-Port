'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { racketBrands } from "@/app/page"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from "./ui/separator"
import FadeInMotionDiv from "./framer/FadeInMotionDiv"

const BrandsFilter = () => {
    const [search, setSearch] = useState('')
    const searchResults = racketBrands.filter((racketBrand) => racketBrand.brand.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const initialCheckedBoxes = searchParams.getAll('brand');
    const params = new URLSearchParams(searchParams);

    function handleCheck(racketBrand: string) {
        params.delete("page") // remove existing 'page' param to fetch new data from page 1
        // Toggle the brand parameter
        if (params.has('brand')) {
            const types = params.getAll('brand');
            if (types.includes(racketBrand)) {
                types.splice(types.indexOf(racketBrand), 1);
            } else {
                types.push(racketBrand);
            }
            params.delete('brand');
            types.forEach(type => params.append('brand', type));
        } else {
            params.append('brand', racketBrand);
        }
        replace(`${pathName}?${params.toString()}`, {scroll: false});
    }
  return (
    <FadeInMotionDiv>
        <input onChange={(e) => setSearch(e.target.value)} type="text" className="border p-2 w-40 mb-2" placeholder="Search by brand." />
        <ScrollArea className="h-60 pr-6">
        <AnimatePresence mode="popLayout">
            {searchResults.map((racketBrand, index) => (
                <motion.div key={racketBrand.brand} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                    <div className="flex items-center justify-between my-2">
                        {racketBrand.logo}
                        <label
                            htmlFor={racketBrand.brand}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {racketBrand.brand}
                        </label>
                        <Checkbox onCheckedChange={() => handleCheck(racketBrand.brand)} checked={initialCheckedBoxes.includes(racketBrand.brand)} id={racketBrand.brand} />
                    </div>
                    {index !== searchResults.length-1 && <Separator />}
                </motion.div>
            ))}
        </AnimatePresence>
        </ScrollArea>
    </FadeInMotionDiv>
  )
}

export default BrandsFilter