import trpc from "@/trpcClient"
import ProductInfo from "@/components/admin/ProductInfo"

const page = async ({params}: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params
    const productData = await trpc.getProduct.query(productId)
    console.log("product data: ", productData)
    if(!productData) return <p>No product data</p>
  return (
    <ProductInfo productData={productData} />
  )
}

export default page