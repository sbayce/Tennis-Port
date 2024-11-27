import trpc from "@/trpcClient"
import { cookies } from "next/headers"
import { setToken } from "@/trpcClient"

const page = async() => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")
  const refreshToken = cookieStore.get("refreshToken")
  console.log("cookie: ", accessToken?.value)
  setToken(accessToken?.value, refreshToken?.value)
  let errorMessage = ""
  let products
  try{
    products = await trpc.getProducts.query()
  }catch(error: any) {
    console.log("client error")
    errorMessage = error.message
  }
  if(errorMessage) return <h1 className="text-center font-semibold text-2xl">Access Denied {errorMessage}</h1>
  return (
    <div>
        <h1>Products</h1>
        {products && products.map(product => <li>{product.name}</li>)}
    </div>
  )
}

export default page