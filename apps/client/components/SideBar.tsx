"use client"
// import BrandsFilter from "./BrandsFilter"
// import RacketTypesFilter from "./RacketTypesFilter"
// import WeightsFilter from "./WeightsFilter"
import PriceFilter from "./PriceFilter"
import { useSearchParams } from "next/navigation"
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

const SideBar = ({ data }: { data: SidebarData }) => {
    const searchParams = useSearchParams()
    // extract the required search params ['type', 'brand', 'price'] without duplicates
    const allParams = Array.from(new Set(Array.from(searchParams.keys()).reduce((res: string[], k) => {
        const required = ['type', 'brand', 'price', 'weight']
        const param = k.split(".")[0]
        if(required.includes(param)) res.push(param) // split price params from 'price.max/price.min' to 'price'
        return res
    }, [])))
    return (
        <AnimatePresence mode="popLayout">
            <div className="p-4 sticky h-screen top-24 hidden flex-col gap-4 lg:flex">
                <Accordion defaultValue={allParams} type="multiple" className="w-48">
                    {Object.entries(data).map(([key, value]) => 
                        <AccordionItem key={key} data-sta value={key}>
                            <AccordionTrigger>{capitalizeFirstChar(key)}</AccordionTrigger>
                            <AccordionContent>
                                <CheckItems paramName={key} listItems={value} />
                                {/* <RacketTypesFilter /> */}
                            </AccordionContent>
                        </AccordionItem>
                    )}
                    {/* <AccordionItem data-sta value="type">
                        <AccordionTrigger>Racket Types</AccordionTrigger>
                        <AccordionContent>
                            <RacketTypesFilter />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="brand">
                        <AccordionTrigger>Racket Brands</AccordionTrigger>
                        <AccordionContent>
                            <BrandsFilter />
                        </AccordionContent>
                    </AccordionItem> */}
                    <AccordionItem value="price">
                        <AccordionTrigger>Price</AccordionTrigger>
                        <AccordionContent>
                            <PriceFilter />
                        </AccordionContent>
                    </AccordionItem>
                    {/* <AccordionItem value="weight">
                        <AccordionTrigger>Weight</AccordionTrigger>
                        <AccordionContent>
                            <WeightsFilter />
                        </AccordionContent>
                    </AccordionItem> */}
                </Accordion>
            </div>
        </AnimatePresence>
    )
}

export default SideBar
