"use client"
import { ColumnDef } from "@tanstack/react-table"

export type ProductItem = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  stock: number
}

export const columns: ColumnDef<ProductItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
]
