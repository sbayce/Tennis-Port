import trpc from "@/trpcClient"
import { Separator } from "@/components/ui/separator"
import PreferenceSelection from "@/components/PreferenceSelection"
import { Check, XIcon } from "lucide-react"
import ActionButtons from "@/components/ActionButtons"
import ProductCarousel from "@/components/ProductCarousel"
import ShoeSizeSelection from "@/components/ShoeSizeSelection"
import { egp } from "@/utils/price-formatter"

const page = async ({params}: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params
    const productData = await trpc.getProduct.query(productId)
    console.log("racket data: ", productData)
    console.log("is shoe: ", productData?.shoe)
    console.log("is racket: ", productData?.racket)
    if(!productData) return <h1>Product not found</h1>
  return (
    <div className="flex flex-col lg:flex-row gap-20 px-4 py-16">
        <ProductCarousel productData={productData} />
        <div className="flex flex-col gap-2 w-full">
            <h1 className="text-3xl md:text-5xl font-bold">{productData.name}</h1>
            <h3 className="text-xl md:text-2xl italic">{productData.brand}</h3>
            <p>{egp.format(productData.price)} <span className="text-sm">EGP</span></p>
            <Separator />
            {productData.racket && <PreferenceSelection />}
            {productData.shoe && <ShoeSizeSelection shoeSizes={productData.shoe.size} />}
            <div className="flex gap-2 items-center  mt-4">
                {productData.stock > 0? 
                    <Check className="h-4 w-4 px-0.5 bg-green-500 text-white rounded-full" strokeWidth={4} /> 
                    : 
                    <XIcon className="h-4 w-4 px-0.5 bg-red-500 text-white rounded-full" strokeWidth={4} />
                }
                <p className={productData.stock > 0? "text-green-500" : "text-red-500"}>{productData.stock > 0? "In stock" : "Out of stock"}</p>
            </div>
            <ActionButtons productData={productData} />
        </div>
    </div>
  )
}

export default page