"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useSortParam } from "@/hooks/params"

const SortMenu = () => {
    const [sort, setSort] = useSortParam()

    function handleChange(value: string) {
      setSort(value)
    }

  return (
    <div className=" gap-2 self-start items-center hidden lg:visible lg:flex ml-auto">
    <p className="font-semibold">Sort by:</p>
    <Select value={sort || undefined} defaultValue={sort || undefined} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
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