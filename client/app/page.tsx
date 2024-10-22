import NavMenu from "@/components/NavMenu";
import MainDisplay from "@/components/MainDisplay";
import SideBar from "@/components/SideBar";

export const racketTypes: string[] = [
  "Allround",
  "Comfort",
  "Junior",
  "Tour"
]
export const racketBrands: string[] = [
  "Babolat",
  "Dunlop",
  "Head",
  "Lacoste",
  "Prince",
  "PROKENNEX",
  "Racket Roots",
  "Tecnifibre",
  "Wilson",
  "Yonex",
  "All brands"
]

export default function Home() {
  return (
    <>
      <MainDisplay />
      <NavMenu />
      <div className="flex gap-2">
        <SideBar />
        ok
      </div>
    </>
  );
}
