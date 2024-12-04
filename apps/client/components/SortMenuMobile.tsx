/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInMotionDiv from "./framer/FadeInMotionDiv"
import { Checkbox } from "./ui/checkbox"
import { MobileFilter } from "./MobileFilterMenu"

type SortMenuMobileProps = {
    addMobileFilter?: any,
    mobileFilters?: MobileFilter[]
}

const SortMenuMobile = ({ addMobileFilter, mobileFilters }: SortMenuMobileProps) => {
    const handleCheck = (option: string) => {
        addMobileFilter({
            key: "sort",
            value: option
        })
    }
    const sortOptions = [
        {id: "ascending", label: "Alphabetically, A-Z"},
        {id: "descending", label: "Alphabetically, Z-A"},
        {id: "low-high", label: "Price, low to high"},
        {id: "high-low", label: "Price, high to low"},
        {id: "old-new", label: "Date, old to new"},
        {id: "new-old", label: "Date, new to old"},
    ]
  return (
    <FadeInMotionDiv className="flex flex-col gap-2 mb-4">
        {mobileFilters && sortOptions.map(option => 
            <div key={option.id} className="flex items-center gap-4">
                <Checkbox
                    checked={mobileFilters.some(filter => filter.key === "sort" && filter.value === option.id)}
                    onCheckedChange={() => handleCheck(option.id)}
                    id={option.id}
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {option.label}
                </label>
            </div>
        )}
    </FadeInMotionDiv>
  )
}

export default SortMenuMobile