"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import PreferenceButton from "./PreferenceButton"

const ShoeSizeSelection = ({ shoeSizes }: { shoeSizes: string[] }) => {
    const path = usePathname()
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const selectedSize = searchParams.get("size") || shoeSizes[0]
    const handleSizeChange = (size: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("size", size)
        replace(`${path}?${params.toString()}`, {scroll: false})
    }
  return (
    <>
        <h3>Size: {selectedSize}</h3>
        <div className="flex gap-2 flex-wrap">
            {shoeSizes.map((size) => <PreferenceButton key={size} isActive={selectedSize === size} option={size} onClick={handleSizeChange} />)}
        </div>
    </>
  )
}

export default ShoeSizeSelection