import MainDisplay from "@/components/MainDisplay"
import SideBar from "@/components/SideBar"
import ActiveFilters from "@/components/ActiveFilters"
import trpc from "@/trpcClient"
import SortMenu from "@/components/SortMenu"
import MobileFilterButton from "@/components/MobileFilterButton"

export default async function ShoesPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const { brandsCount, typesCount, sizeCount } = await trpc.getAvailableShoes.query()
    const sidebarData = {type: typesCount, brand: brandsCount, size: sizeCount}
  return (
    <>
      <MainDisplay img1="https://cdn.runrepeat.com/storage/gallery/product_content/39593/asics-court-ff-3-flexibility-21027883-main.jpg"
        img2="https://allthingstennis.co.uk/cdn/shop/collections/f712f2660c813d8b0498575ef44dcd17.jpg?v=1728765963&width=2000"
        img3="https://allthingstennis.co.uk/cdn/shop/collections/Head_Shoes_Banner.png?v=1719264872&width=1400" />
      <div className="flex gap-2">
        <SideBar data={sidebarData} />
        <div className="flex flex-col gap-8 mb-4 md:mb-10 w-full">
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
