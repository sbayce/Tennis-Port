"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import MobileFilterMenu from "./MobileFilterMenu"
import { SidebarData } from "@/types/sidebar"
import { ListFilter } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { useSearchParams } from "next/navigation"

const MobileFilterButton = ({ data }: { data: SidebarData }) => {
    const [open, setOpen] = useState(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        setOpen(false)
    }, [searchParams])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="sticky bottom-4 text-sm mx-auto text-white lg:hidden bg-[#202223] rounded-3xl py-3 px-8 flex items-center gap-2"><ListFilter className="w-5" />Filter and sort</SheetTrigger>
        <SheetContent className="max-h-[60%] min-h-[60%] mx-2 mb-2 px-2 py-0 rounded-xl flex" side="bottom">
        <SheetHeader className="hidden">
          <SheetTitle />
        <SheetDescription />
        </SheetHeader>
        <ScrollArea className="h-96 w-full px-4">
            <MobileFilterMenu data={data} />
        </ScrollArea>
        </SheetContent>
    </Sheet>


  )
}

export default MobileFilterButton