'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { racketBrands } from "@/app/page"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from "./ui/separator"

const BrandsFilter = () => {
    const [search, setSearch] = useState('')
    const searchResults = racketBrands.filter((racketBrand) => racketBrand.brand.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const initialCheckedBoxes = searchParams.getAll('brand');
    const [checkedBoxes, setCheckedBoxes] = useState<string[]>(initialCheckedBoxes);

    useEffect(() => {
        setCheckedBoxes(searchParams.getAll('brand'));
    }, [searchParams]);

    function handleCheck(racketBrand: string) {
        const params = new URLSearchParams(searchParams);

        // Toggle the racket type parameter
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
    <>
        <h3 className="font-semibold mb-2">Racket Brands</h3>
        <input onChange={(e) => setSearch(e.target.value)} type="text" className="border p-2 w-40 mb-2" placeholder="Search by brand." />
        <ScrollArea className="h-60 w-48">
        <AnimatePresence mode="popLayout">
            <div className="px-4">
                {searchResults.map((racketBrand, index) => (
                    <>
                    <motion.div key={racketBrand.brand} className="flex items-center justify-between my-2" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        {racketBrand.logo}
                        <label
                            htmlFor={racketBrand.brand}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {racketBrand.brand}
                        </label>
                        <Checkbox onCheckedChange={() => handleCheck(racketBrand.brand)} checked={initialCheckedBoxes.includes(racketBrand.brand)} className="w-6 h-6" id={racketBrand.brand} />
                    </motion.div>
                    {index !== searchResults.length-1 && <Separator />}
                    </>
                    
                ))}
            </div>
        </AnimatePresence>
        </ScrollArea>
    </>
  )
}

export default BrandsFilter