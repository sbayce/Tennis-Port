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

const PaginationTab = ({ numOfPages }: { numOfPages: number }) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const currentPage = Number(params.get("page")) || 1
  if(params.has("page")){
    params.delete("page")
  }
  const path = usePathname()
    return (
      <Pagination className="mt-auto">
        <PaginationContent>
          <PaginationItem>
            {currentPage === 1? <ChevronLeft className="h-4 w-4 opacity-40 mr-4" /> : <PaginationPrevious href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage-1}`} />}
          </PaginationItem>
          
              { currentPage - 1 > 0 && <PaginationItem>
              <PaginationLink href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage-1}`}>{currentPage-1}</PaginationLink>
              </PaginationItem>}
            
            <PaginationItem>
              <PaginationLink isActive href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage}`}>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              { currentPage +1 <= numOfPages && 
                <PaginationLink href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage+1}`}>{currentPage+1}</PaginationLink>
              }
            </PaginationItem>
            { currentPage +2 <= numOfPages && 
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            }

          <PaginationItem>
            { currentPage === numOfPages? <ChevronRight className="h-4 w-4 opacity-40 mr-4" /> 
            : 
              <PaginationNext href={`${path}?${params}${params.size > 0? "&" : ""}page=${currentPage+1}`} />
            }
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}
export default PaginationTab
  