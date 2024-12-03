import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { racketTypes, racketBrands } from "@/static-data/data"
  import { useEffect, useState } from "react"
  import { MenuIcon } from "lucide-react"
  import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ListVariant = {
    hidden: {
        opacity: 0,
        x: -100
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2
        }
    }
}

const NavDropDown = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [open, setOpen] = useState(false)
    const path = usePathname()

    useEffect(() => {
        if(!open) setCurrentPage(0)
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [path])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex md:hidden"><MenuIcon /></SheetTrigger>
        <SheetContent className="max-h-[60%] min-h-[60%] ml-3 max-w-[95%] min-w-[95%] rounded-t-xl flex" side="bottom">
            <SheetHeader>
                <SheetTitle />
                <SheetDescription />
            </SheetHeader>
            {currentPage === 0 && <div className="flex flex-col gap-4 text-2xl font-semibold items-start">
                {/* <button onClick={() => setCurrentPage(1)}>Rackets</button>
                <button onClick={() => setCurrentPage(2)}>Shoes</button> */}
                <Link href={`/rackets`}>Rackets</Link>
                <Link href={`/shoes`}>Shoes</Link>
            </div>}
            {currentPage === 1 && <div className="flex flex-col gap-4">
                <motion.div variants={ListVariant} initial="hidden" animate="visible" className="flex flex-col gap-4 font-semibold items-start">
                    <button className="text-3xl">Types</button>
                    <div className="flex flex-col gap-1 items-start">
                        {racketTypes.map(type => <Link href={`/?type=${type.toLowerCase()}`} key={type} className="text-xl text-[#202223]">{type}</Link>)}
                    </div>
                    <button className="text-3xl">Brands</button>
                    <div className="flex flex-col gap-1 items-start">
                        {racketBrands.map(brand => <Link onClick={() => setOpen(false)} href={`/?brand=${brand.brand.toLowerCase()}`} key={brand.brand} className="text-xl text-[#202223]">{brand.brand}</Link>)}
                    </div>
                </motion.div>
                </div>}
        </SheetContent>
    </Sheet>


  )
}

export default NavDropDown