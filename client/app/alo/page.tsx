import trpc from "@/trpcClient"

const Alo = async () => {
    const res = await trpc.alos.query()
    console.log("result: ", res)
  return (
    <div>Alo</div>
  )
}

export default Alo