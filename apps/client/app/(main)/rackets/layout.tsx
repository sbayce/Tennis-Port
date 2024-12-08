import MainDisplay from "@/components/MainDisplay"
import SideBar from "@/components/SideBar"
import ActiveFilters from "@/components/ActiveFilters"
import trpc from "@/trpcClient"
import SortMenu from "@/components/SortMenu"
import MobileFilterButton from "@/components/MobileFilterButton"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const { brandsCount, typesCount, weightsCount } = await trpc.getAvailableRackets.query()
    const sidebarData = {type: typesCount, brand: brandsCount, weight: weightsCount}
  return (
    <>
      <MainDisplay img1="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/wilson.webp"
        img2="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/prince.jpg"
        img3="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/head.webp" />
      <div className="flex gap-2">
        <SideBar data={sidebarData} />
        <div className="flex flex-col gap-4 mb-4 md:mb-10 w-full">
          <div className="flex justify-between mt-4">
            <ActiveFilters />
            <SortMenu />
          </div>
          {children}
          <MobileFilterButton data={sidebarData} />
        </div>
      </div>
    </>
  )
}
