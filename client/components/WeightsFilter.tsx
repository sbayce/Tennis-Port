"use client"
import { racketWeights } from "@/app/page"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import FadeInMotionDiv from "./framer/FadeInMotionDiv"

const WeightsFilter = () => {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const initialCheckedBoxes = searchParams.getAll('weight');
    const [checkedBoxes, setCheckedBoxes] = useState<string[]>(initialCheckedBoxes);

    useEffect(() => {
        setCheckedBoxes(searchParams.getAll('weight'));
    }, [searchParams]);

    function handleCheck(weight: string) {
        const params = new URLSearchParams(searchParams);

        // Toggle the racket type parameter
        if (params.has('weight')) {
            const weights = params.getAll('weight');
            if (weights.includes(weight)) {
                weights.splice(weights.indexOf(weight), 1);
            } else {
                weights.push(weight);
            }
            params.delete('weight');
            weights.forEach(weight => params.append('weight', weight));
        } else {
            params.append('weight', weight);
        }
        replace(`${pathName}?${params.toString()}`, {scroll: false});
    }
  return (
        <FadeInMotionDiv className="flex flex-col gap-2 mb-4">
            {racketWeights.map(racketWeight => (
                <div key={racketWeight} className="flex items-center justify-between">
                    <label
                        htmlFor={racketWeight}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {racketWeight}
                    </label>
                    <Checkbox
                        checked={checkedBoxes.includes(racketWeight)}
                        onCheckedChange={() => handleCheck(racketWeight)}
                        id={racketWeight}
                    />
                </div>
            ))}
        </FadeInMotionDiv>
    )
}

export default WeightsFilter