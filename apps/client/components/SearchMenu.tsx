import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { ScrollArea } from "./ui/scroll-area"
  import debounce from 'lodash.debounce'
  import trpc from "@/trpcClient"
  import { useCallback, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import Link from "next/link"
import ProductNameLink from "./ProductNameLink"
import { usePathname } from "next/navigation"
import SheetContentFade from "./framer/SheetContentFade"
  
  type SearchResult = {
      id: string,
      name: string,
      brand: string,
      image: string,
      price: number
  }
  
  const ProductsVariant = {
    hidden: {
        opacity: 0,
        height: 0,
    },
    visible: {
        opacity: 1,
        height: "70vh",
        transition: {
            when: "beforeChildren",
            type: "spring",
            damping: 7,
            mass: 0.1,
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            when: "afterChildren",
            type: "spring",
            damping: 7,
            mass: 0.1,
        }
    }
  }
  const ProductVariant = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.1
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1
        }
    }
  }

const SearchMenu = () => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [searchInput, setSearchInput] = useState("")
    const [open, setOpen] = useState(false)
    const path = usePathname()

    const searchProducts = async (searchInput: string) => {
        const results = await trpc.searchProducts.query(searchInput)
        setSearchResults(results)
    }
    const debouncedSearch = debounce((searchInput: string) => searchProducts(searchInput), 1000)

    const handleChange = useCallback((value: string) => {
        if(value === ""){
            debouncedSearch.cancel() // cancel the ongoing debounce (if exists)
            setSearchResults([])
            setSearchInput(value)
            return
        }
        setSearchInput(value)
        debouncedSearch(value)
    }, [])

    useEffect(() => {
        setOpen(false)
    }, [path])

    console.log("search results: ", searchResults)
  return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger><Search /></SheetTrigger>
            <SheetContent className="pb-0 mx-2 mt-2 rounded-xl p-4 md:p-6" side="top">
            <SheetHeader>
                <SheetTitle />
                <SheetDescription />
            </SheetHeader>
            <SheetContentFade>
                <div className="mx-4 md:mx-10 mb-4 md:mb-10">
                    <input value={searchInput} onChange={(e) => handleChange(e.target.value)} className={`w-full text-md md:text-2xl p-0 md:p-2 border-b-2 border-opacity-30 focus:outline-none
                        focus:border-b-[#202223] transition-colors duration-300 rounded-none`} type="text" placeholder="Search for..." />
                </div>
                        <AnimatePresence>
                    {searchResults.length > 0 && 
                        <motion.div key="products-list" variants={ProductsVariant} initial="hidden" animate="visible" exit="exit">
                            <ScrollArea className="h-full md:max-h-[700px]">
                                {searchResults.map(product => <Link key={product.id} href={`/product/${product.id}`}>
                                <motion.div variants={ProductVariant} className="flex gap-2 mt-4 items-center text-sm md:text-base">
                                        <img className="w-20 h-20 md:w-24 md:h-24" src={product.image} />
                                        <div className="flex flex-col gap-1">
                                            <ProductNameLink productId={product.id} name={product.name} />
                                            <p className="text-xs">{product.brand}</p>
                                            <p className="text-sm">{product.price} EGP</p>
                                        </div>
                                </motion.div>
                                </Link>)}
                            </ScrollArea>
                    </motion.div>}
                </AnimatePresence>
                </SheetContentFade>
            </SheetContent>
        </Sheet>

  )
}

export default SearchMenu