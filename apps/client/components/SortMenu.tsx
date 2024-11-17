import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useRouter, usePathname, useSearchParams } from "next/navigation"

const SortMenu = () => {
    const { replace } = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())
    const sortParam = params.get("sort") || "featured" // get sort param (defaults to 'featured')

    function handleChange(value: string) {
        params.set("sort", value)
        replace(`${path}?${params.toString()}`, {scroll: false})
    }

  return (
    <div className=" gap-2 self-start items-center hidden lg:visible lg:flex ml-auto">
    <p className="font-semibold">Sort by:</p>
    <Select value={sortParam} defaultValue={sortParam} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="best-selling">Best selling</SelectItem>
            <SelectItem value="ascending">Alphabetically, A-Z</SelectItem>
            <SelectItem value="descending">Alphabetically, Z-A</SelectItem>
            <SelectItem value="low-high">Pice, low to high</SelectItem>
            <SelectItem value="high-low">Pice, high to low</SelectItem>
            <SelectItem value="old-new">Date, old to new</SelectItem>
            <SelectItem value="new-old">Date, new to old</SelectItem>
        </SelectContent>
    </Select>
    </div>
  )
}

export default SortMenu