import { motion } from "framer-motion"
import debounce from 'lodash.debounce'
import trpc from "@/trpcClient"
import { useState } from "react"

type SearchResult = {
    id: string,
    name: string,
    brand: string,
    price: number
}

const SearchBar = ({ scrollDirection }: { scrollDirection: string }) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const searchProducts = async (searchInput: string) => {
        const results = await trpc.searchProducts.query(searchInput)
        setSearchResults(results)
    }
    const debouncedSearch = debounce((searchInput: string) => searchProducts(searchInput), 1000)
    console.log("search results: ", searchResults)
  return (
    <div>
        <motion.input 
          type="text" 
          className="border p-2 w-96 mt-6 hidden lg:visible lg:flex ml-auto" 
          placeholder="Search for tennis stuff."
          animate={{opacity: scrollDirection === 'up' || !scrollDirection ? 1 : 0}}
          transition={{duration: 0.2}}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
  )
}

export default SearchBar