/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInMotionDiv from "./framer/FadeInMotionDiv"
import { Checkbox } from "./ui/checkbox"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { LabelCount } from "@/types/sidebar"
import { capitalizeFirstChar } from "@/utils/capitalize-first-char"
import { MobileFilter } from "./MobileFilterMenu"

type CheckItemsProps = {
    listItems: LabelCount,
    paramName: string,
    addMobileFilter?: any,
    mobileFilters?: MobileFilter[]
}

const CheckItems = ({ listItems, paramName, addMobileFilter, mobileFilters }: CheckItemsProps) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const checkedBoxes = searchParams.getAll(paramName);
    const params = new URLSearchParams(searchParams);

    function toggleCheck(weight: string) {
        params.delete("page") // remove existing 'page' param to fetch new data from page 1
        // Toggle the search parameter
        if (params.has(paramName)) {
            const weights = params.getAll(paramName);
            if (weights.includes(weight)) {
                weights.splice(weights.indexOf(weight), 1);
            } else {
                weights.push(weight);
            }
            params.delete(paramName);
            weights.forEach(weight => params.append(paramName, weight));
        } else {
            params.append(paramName, weight);
        }
        replace(`${pathName}?${params.toString()}`, {scroll: false});
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
                        checked={checkedBoxes.includes(listItem.label.toLowerCase())}
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