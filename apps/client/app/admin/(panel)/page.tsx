import trpc from "@/trpcClient"
import { cookies } from "next/headers"
import { setToken } from "@/trpcClient"
import { DataTable } from "@/components/admin/DataTable"
import { columns, ProductItem } from "@/components/admin/columns"
import { Separator } from "@/components/ui/separator"
import { AddProductModal } from "@/components/admin/AddProductModal"

const page = async() => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")
  const refreshToken = cookieStore.get("refreshToken")
  console.log("cookie: ", accessToken?.value)
  setToken(accessToken?.value, refreshToken?.value)
  let errorMessage = ""
  let products: ProductItem[] | undefined
  try{
    products = await trpc.getProducts.query()
  }catch(error: any) {
    console.log("client error")
    errorMessage = error.message
  }
  if(errorMessage) return <h1 className="text-center font-semibold text-2xl">Access Denied {errorMessage}</h1>
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-2">Products</h1>
        <AddProductModal />
      </div>
        <Separator className="mb-4" />
        {products && <DataTable columns={columns} data={products} />}
        {/* {products && products.map(product => <li>{product.name}</li>)} */}
    </div>
  )
}

export default page