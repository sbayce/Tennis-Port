"use client"
import PriceFilter from "./PriceFilter"
import { AnimatePresence } from "framer-motion"
import CheckItems from "./CheckItems"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { capitalizeFirstChar } from "@/utils/capitalize-first-char"
  import { SidebarData } from "@/types/sidebar"
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

type MobileFilter = {
    key: string
    value: string
}

const MobileFilterMenu = ({ data }: { data: SidebarData }) => {
    const [mobileFilters, setMobileFilters] = useState<MobileFilter[]>([])
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const path = usePathname()

    const addMobileFilter = (filter: MobileFilter) => {
        setMobileFilters(prev => {
            const existingIndex = prev.findIndex(f => f.value === filter.value)
            if(existingIndex !== -1) {
                const updatedFilters = prev.filter((_, i) => i !== existingIndex)
                return updatedFilters
            }
            return [
                ...prev,
                filter
            ]
    })
    }
    const applyFilters = () => {
        const params = new URLSearchParams(searchParams)
        mobileFilters.map(filter => params.append(filter.key, filter.value))
        replace(`${path}?${params.toString()}`)
    }
    console.log("mobile filters: ", mobileFilters)
    console.log("data: ", data)
    return (
        <AnimatePresence mode="popLayout">
                <Accordion type="multiple" className="mb-20 text-sm">
                    {Object.entries(data).map(([key, value]) => 
                        <AccordionItem key={`${key}-mobile`} value={key}>
                            <AccordionTrigger>{capitalizeFirstChar(key)}</AccordionTrigger>
                            <AccordionContent>
                                <CheckItems paramName={key} listItems={value} addMobileFilter={addMobileFilter} />
                            </AccordionContent>
                        </AccordionItem>
                    )}
                    <AccordionItem value="price">
                        <AccordionTrigger>Price</AccordionTrigger>
                        <AccordionContent>
                            <PriceFilter />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <button onClick={applyFilters} className="absolute bottom-0 rounded-2xl bg-[#C75828] py-3 px-5 text-sm
                     font-semibold text-white w-[90%]">{`Apply (${mobileFilters.length})`}</button>
        </AnimatePresence>
    )
}

export default MobileFilterMenu
