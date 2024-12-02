import MainDisplay from "@/components/MainDisplay"
import SideBar from "@/components/SideBar"
import ActiveFilters from "@/components/ActiveFilters"
// import trpc from "@/trpcClient"
import SortMenu from "@/components/SortMenu"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    // const { brandsCount, typesCount, weightsCount } = await trpc.getAvailableRackets.query()
    // console.log(brandsCount)
    // console.log(typesCount)
    // console.log(weightsCount)
    // const sidebarData = {type: typesCount, brand: brandsCount, weight: weightsCount}
  return (
    <>
      <MainDisplay />
      <div className="flex gap-2">
        <SideBar data={{type: [], brand: []}} />
        <div className="flex flex-col gap-8 mb-20 w-full">
          <div className="flex justify-between mt-4">
            <ActiveFilters />
            <SortMenu />
            {/* {rackets.length > 0 && <SortMenu />} */}
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
