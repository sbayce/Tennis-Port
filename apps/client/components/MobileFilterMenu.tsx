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
import SortMenuMobile from "./SortMenuMobile"
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export type MobileFilter = {
    key: string
    value: string
}

const MobileFilterMenu = ({ data }: { data: SidebarData }) => {
    const searchParams = useSearchParams()
    const params = Array.from(searchParams.entries())
    // remove duplicates
    const uniqueParams = Array.from(
        new Map(params.map(([key, value]) => [`${key}:${value}`, [key, value]])).values()
      );
    const initialMobileFilters = uniqueParams.map(param => ({key: param[0], value: param[1]}))
    console.log("initialMobileFilters: ", initialMobileFilters)
    const [mobileFilters, setMobileFilters] = useState<MobileFilter[]>(initialMobileFilters)
    const { replace } = useRouter()
    const path = usePathname()

    const addMobileFilter = (filter: MobileFilter) => {
        setMobileFilters(prev => {
            if(filter.key === "sort"){
                const existingSortIndex = prev.findIndex(f => f.key === "sort")
                if(existingSortIndex !== -1) {
                    const updatedFilters = [...prev]
                    updatedFilters[existingSortIndex].value = filter.value
                    return updatedFilters
                }
            }
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
        const params = new URLSearchParams()
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
                                <CheckItems paramName={key} listItems={value} mobileFilters={mobileFilters} addMobileFilter={addMobileFilter} />
                            </AccordionContent>
                        </AccordionItem>
                    )}
                    <AccordionItem value="price">
                        <AccordionTrigger>Price</AccordionTrigger>
                        <AccordionContent>
                            <PriceFilter />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="sort">
                        <AccordionTrigger>Sort</AccordionTrigger>
                        <AccordionContent>
                            <SortMenuMobile addMobileFilter={addMobileFilter} mobileFilters={mobileFilters} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <button onClick={applyFilters} className="absolute bottom-0 rounded-2xl bg-[#C75828] py-3 px-5 text-sm
                     font-semibold text-white w-[90%]">{`Apply (${mobileFilters.length})`}</button>
        </AnimatePresence>
    )
}

export default MobileFilterMenu
