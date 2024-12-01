import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AddProductForm from "./AddProductForm"

export function AddProductModal() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="py-2 px-4 bg-[#202223] rounded-lg text-white">Add new product</button>
      </SheetTrigger>
      <SheetContent className="min-w-[900px]">
        <SheetHeader>
          <SheetTitle>New Product</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <AddProductForm />
        <SheetFooter />
      </SheetContent>
    </Sheet>
  )
}
