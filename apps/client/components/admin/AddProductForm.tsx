"use client"
import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import trpc from "@/trpcClient"
import { newProductSchema } from "trpc/schemas/add-product"
import { toast } from "sonner"
import Input from "./Input"

const shoeTypes = ["MALE", "FEMALE", "UNISEX"]

type NewProductSchemaType = z.infer<typeof newProductSchema>

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<NewProductSchemaType>({
    resolver: zodResolver(newProductSchema),
    shouldFocusError: false,
  })

  const [category, setCategory] = useState("")
  const sizeRef = useRef<HTMLInputElement>(null)
  const sizes = watch("size") || []

  const submitProduct = async (data: NewProductSchemaType) => {
    if (!category) return
    console.log("Submitting data: ", data)
    const product = await trpc.addProduct.mutate(data)
    console.log("added product: ", product)
    reset()
    toast.success("Product created")
  }
  const addSize = () => {
    if(!sizeRef.current) return
    const size = sizeRef.current.value.trim()
    if(size) {
      setValue("size", [...sizes, size])
      sizeRef.current.value = ""
    }
  }
  console.log("errors: ", errors)
  return (
    <form onSubmit={handleSubmit(submitProduct)} className="flex flex-col gap-2">
      <Input label="Name" register={register} id="name" type="text" />
      <Input label="Brand" register={register} id="brand" type="text" />
      <Input label="Price" register={register} id="price" type="text" />
      <Input label="Stock" register={register} id="stock" type="text" />
      <Input label="Image" register={register} id="image" type="text" />
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="RACKET"
          value="RACKET"
          {...register("category")}
          checked={category === "RACKET"}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="RACKET">Racket</label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="SHOE"
          value="SHOE"
          {...register("category")}
          checked={category === "SHOE"}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="SHOE">Shoe</label>
      </div>
      {category === "RACKET" && (
        <div className="flex flex-col gap-2">
          <Input label="Racket type" register={register} id="racketType" type="text" />
          <Input label="Head size" register={register} id="headSize" type="text" />
          <Input label="Weight" register={register} id="weight" type="text" />
          <Input label="Pattern" register={register} id="pattern" type="text" />
        </div>
      )}
      {category === "SHOE" && (
        <div className="flex flex-col gap-2">
          <label htmlFor="shoe-type">Shoe Type</label>
          <select id="shoe-type" className="border rounded-md">
            {shoeTypes.map(shoeType => <option key={shoeType} {...register("shoeType")} value={shoeType}>{shoeType}</option>)}
          </select>
          <label htmlFor="size">Sizes</label>
          <div className="flex gap-2">
            {sizes.map(size => <p key={size} className="bg-[#202223] rounded-md text-white px-1 text-sm">{size}</p>)}
          </div>
          <div className="flex gap-2">
            <input id="size" ref={sizeRef} type="number" className="border" />
            <button type="button" onClick={addSize} className="bg-[#202223] rounded-md text-white px-1 text-sm">Add</button>
          </div>
        </div>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="text-red-700 text-xs p-4 font-semibold bg-red-100 w-1/4 rounded-xl">
          {Object.entries(errors).map(([field, error]) => (
            <p key={field}>{(error as any).message}</p>
          ))}
        </div>
      )}
      <Button disabled={isSubmitting} className="self-end" type="submit">
        Add product
      </Button>
    </form>
  )
}

export default AddProductForm
