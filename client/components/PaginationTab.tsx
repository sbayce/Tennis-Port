import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight} from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
  const NUMBER_OF_PAGES = 5
function PaginationTab() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const currentPage = Number(params.get("page")) || 1
  console.log("size: ", params.size)
  if(params.has("page")){
    params.delete("page")
  }
  const path = usePathname()
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage === 1? <ChevronLeft className="h-4 w-4 opacity-40 mr-4" /> : <PaginationPrevious href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage-1}`} />}
          </PaginationItem>
          {[...Array(NUMBER_OF_PAGES)].map((_, i) => <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i+1} href={`${path}?${params}${params.size > 0? "&" : ""}page=${i+1}`}>{i+1}</PaginationLink>
          </PaginationItem>)}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            {currentPage === NUMBER_OF_PAGES? <ChevronRight className="h-4 w-4 opacity-40 mr-4" /> : <PaginationNext href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage+1}`} />}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}
export default PaginationTab
  