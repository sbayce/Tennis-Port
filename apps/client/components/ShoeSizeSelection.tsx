"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

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
        <h3>Size:</h3>
        <div className="flex gap-2 flex-wrap">
            {shoeSizes.map((size) => <button onClick={() => handleSizeChange(size)} 
            className={`p-2 text-sm border rounded-lg ${selectedSize === size? "bg-[#202223] border-none text-white" : undefined}`} 
            key={`size-${size}`}>{size}</button>)}
        </div>
    </>
  )
}

export default ShoeSizeSelection