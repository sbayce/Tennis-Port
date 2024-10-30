'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { racketBrands } from "@/app/page"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const BrandsFilter = () => {
    const [search, setSearch] = useState('')
    const searchResults = racketBrands.filter((racketBrand) => racketBrand.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
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
        replace(`${pathName}?${params.toString()}`);
    }
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
                        <Checkbox onCheckedChange={() => handleCheck(racketBrand)} checked={initialCheckedBoxes.includes(racketBrand)} className="w-6 h-6" id={racketBrand} />
                    </div>
                ))}
            </div>
        </ScrollArea>
    </>
  )
}

export default BrandsFilter