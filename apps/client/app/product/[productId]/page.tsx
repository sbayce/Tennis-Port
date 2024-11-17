import trpc from "@/trpcClient"
import { Separator } from "@/components/ui/separator"
import PreferenceSelection from "@/components/PreferenceSelection"
import { Check, XIcon } from "lucide-react"
import ActionButtons from "@/components/ActionButtons"
import ProductCarousel from "@/components/ProductCarousel"

const page = async ({params}: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params
    const racketData = await trpc.getRacket.query(productId)
    console.log("racket data: ", racketData)
    if(!racketData) return <h1>Product not found</h1>
  return (
    <div className="flex flex-col lg:flex-row gap-20 py-16">
        <ProductCarousel racketData={racketData} />
        <div className="flex flex-col gap-2 w-full">
            <h1 className="text-5xl font-bold">{racketData.name}</h1>
            <h3 className="text-2xl italic">{racketData.brand}</h3>
            <p>{racketData.price} <span className="text-sm">EGP</span></p>
            <Separator />
            <PreferenceSelection />
            <div className="flex gap-2 items-center  mt-4">
                {racketData.stock > 0? 
                    <Check className="h-4 w-4 px-0.5 bg-green-500 text-white rounded-full" strokeWidth={4} /> 
                    : 
                    <XIcon className="h-4 w-4 px-0.5 bg-red-500 text-white rounded-full" strokeWidth={4} />
                }
                <p className={racketData.stock > 0? "text-green-500" : "text-red-500"}>{racketData.stock > 0? "In stock" : "Out of stock"}</p>
            </div>
            <ActionButtons racketData={racketData} />
        </div>
    </div>
  )
}

export default page