import { racketTypes, racketBrands } from "@/app/page"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import BrandList from "./BrandList"

const SideBar = () => {
  return (
    <div className="p-4">
        <h3 className="font-semibold mb-2">Racket Types</h3>
        <div className="flex flex-col gap-2 mb-4">
            {racketTypes.map(racketType => 
            <div key={racketType} className="flex items-center justify-between">
                <label
                    htmlFor={racketType}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {racketType}
                </label>
                <Checkbox className="w-6 h-6" id={racketType} />
            </div>)}
        </div>
        <BrandList />
        
    </div>
  )
}

export default SideBar