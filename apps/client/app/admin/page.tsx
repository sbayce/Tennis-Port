import trpc from "@/trpcClient"
import { cookies } from "next/headers"
import { setToken } from "@/trpcClient"

const page = async() => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")
  const refreshToken = cookieStore.get("refreshToken")
  console.log("cookie: ", accessToken?.value)
  setToken(accessToken?.value, refreshToken?.value)
  const orders = await trpc.getOrders.query()
  return (
    <div>
      ok
        {orders.map(order => <li>{order.customerEmail}</li>)}
    </div>
  )
}

export default page