"use client"
import { racketTypes } from "@/app/page"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import FadeInMotionDiv from "./framer/FadeInMotionDiv"

const RacketTypesFilter = () => {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const initialCheckedBoxes = searchParams.getAll('type');
    const [checkedBoxes, setCheckedBoxes] = useState<string[]>(initialCheckedBoxes);

    useEffect(() => {
        setCheckedBoxes(searchParams.getAll('type'));
    }, [searchParams]);

    function handleCheck(racketType: string) {
        const params = new URLSearchParams(searchParams);

        // Toggle the racket type parameter
        if (params.has('type')) {
            const types = params.getAll('type');
            if (types.includes(racketType)) {
                types.splice(types.indexOf(racketType), 1);
            } else {
                types.push(racketType);
            }
            params.delete('type');
            types.forEach(type => params.append('type', type));
        } else {
            params.append('type', racketType);
        }
        replace(`${pathName}?${params.toString()}`, {scroll: false});
    }
  return (
        <FadeInMotionDiv className="flex flex-col gap-2 mb-4">
            {racketTypes.map(racketType => (
                <div key={racketType} className="flex items-center justify-between">
                    <label
                        htmlFor={racketType}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {racketType}
                    </label>
                    <Checkbox
                        checked={checkedBoxes.includes(racketType)}
                        onCheckedChange={() => handleCheck(racketType)}
                        id={racketType}
                    />
                </div>
            ))}
        </FadeInMotionDiv>
    )
}

export default RacketTypesFilter