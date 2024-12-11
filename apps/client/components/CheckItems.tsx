/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInMotionDiv from "./framer/FadeInMotionDiv"
import { Checkbox } from "./ui/checkbox"
import { LabelCount } from "@/types/sidebar"
import { capitalizeFirstChar } from "@/utils/capitalize-first-char"
import { MobileFilter } from "./MobileFilterMenu"
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'

type CheckItemsProps = {
    listItems: LabelCount,
    paramName: string,
    addMobileFilter?: any,
    mobileFilters?: MobileFilter[]
}
//*************** Fix rerenders ****************** */
const CheckItems = ({ listItems, paramName, addMobileFilter, mobileFilters }: CheckItemsProps) => {
    const [params, setParams] = useQueryState<string[]>(paramName, parseAsArrayOf(parseAsString, ";"))

    function toggleCheck(weight: string) {
        setParams((old) => {
            let updated
            if (old) {
                if (old.includes(weight)) {
                    updated = old.filter((value) => value !== weight)
                } else {
                    updated = [...old, weight]
                }
            } else {
                updated = [weight]
            }
            return updated.length > 0 ? updated : null
        })
    }
    const handleCheck = (label: string) => {
        if(addMobileFilter) {
            addMobileFilter({
                key: paramName,
                value: label
            })
            return
        }
        toggleCheck(label)
    }
  return (
    <FadeInMotionDiv className="flex flex-col gap-2 mb-4">
        {listItems.map(listItem => (
            <div key={listItem.label} className="flex items-center gap-4">
                {mobileFilters ? 
                    <Checkbox
                        checked={mobileFilters.some(filter => filter.key === paramName && filter.value === listItem.label.toLocaleLowerCase())}
                        onCheckedChange={() => handleCheck(listItem.label.toLowerCase())}
                        id={listItem.label}
                    />
                    :
                    <Checkbox
                        checked={ params !== null && params.includes(listItem.label.toLowerCase()) }
                        onCheckedChange={() => handleCheck(listItem.label.toLowerCase())}
                        id={listItem.label}
                    />
                }
                <label
                    htmlFor={listItem.label}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {capitalizeFirstChar(listItem.label)}
                </label>
                <p className="">({listItem.count})</p>
            </div>
        ))}
    </FadeInMotionDiv>
  )
}

export default CheckItems