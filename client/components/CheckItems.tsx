import FadeInMotionDiv from "./framer/FadeInMotionDiv"
import { Checkbox } from "./ui/checkbox"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

type CheckItemsProps = {
    listItems: any[],
    paramName: string
}

const CheckItems = ({ listItems, paramName }: CheckItemsProps) => {
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

  return (
    <FadeInMotionDiv className="flex flex-col gap-2 mb-4">
        {listItems.map(listItem => (
            <div key={listItem} className="flex items-center gap-4">
                <Checkbox
                    checked={checkedBoxes.includes(listItem)}
                    onCheckedChange={() => toggleCheck(listItem)}
                    id={listItem}
                />
                <label
                    htmlFor={listItem}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {listItem}
                </label>
            </div>
        ))}
    </FadeInMotionDiv>
  )
}

export default CheckItems