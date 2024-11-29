import trpc from "@/trpcClient"

const page = async ({params}: { params: Promise<{ productId: string }> }) => {
    const { productId } = await params
    const productData = await trpc.getProduct.query(productId)
    console.log("product data: ", productData)
    if(!productData) return <p>No product data</p>
  return (
    <div className="flex flex-col p-10 items-center gap-10 mx-auto">
        <div className="flex gap-10 ">
            <img className="w-20 h-20" src={productData.image} alt="product-img" />
            <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">{productData.name}</p>
                <p className="flex gap-4"><span className="font-semibold">Brand:</span>{productData.brand}</p>
                <p className="flex gap-4"><span className="font-semibold">Price:</span>{productData.price}</p>
                <p className="flex gap-4"><span className="font-semibold">Category:</span>{productData.category}</p>
                <p className="flex gap-4"><span className="font-semibold">Stock:</span>{productData.stock}</p>
            </div>
        </div>
        <div>
            <h1 className="text-2xl font-semibold mb-8">Main images</h1>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2 items-center">
                    <img className="w-20 h-20" src={productData.image} alt="product-img" />
                    <h1 className="text-sm font-semibold">Image</h1>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <img className="w-20 h-20" src={productData.image2} alt="product-img2" />
                    <h1 className="text-sm font-semibold">Image2</h1>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-6">
            <h1 className="text-lg font-semibold">Gallery</h1>
            {productData.images.length > 0 ? 
                productData.images.map(image => <img className="w-20 h-20" src={image} alt="product-img" />)
                :
                <p>No more images</p>
            }
            
        </div>
    </div>
  )
}

export default page