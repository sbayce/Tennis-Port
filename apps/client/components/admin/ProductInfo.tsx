/* eslint-disable */
"use client"
import { Product } from "@/types/product"
import S3 from 'react-aws-s3-typescript'
import trpc from "@/trpcClient"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProductSchema } from "trpc/schemas/update-product"
import { z } from 'zod'
import { Button } from "../ui/button"
import Input from "./Input"
import { useRef } from "react"

const shoeTypes = ["MALE", "FEMALE", "UNISEX"]
type UpdateProductSchemaType = z.infer<typeof updateProductSchema>

const ProductInfo = ({ productData }: { productData: Product }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
      } = useForm<UpdateProductSchemaType>({
        resolver: zodResolver(updateProductSchema),
        shouldFocusError: false,
      })
      const name = watch("name", productData.name)
      const brand = watch("brand", productData.brand)
      const price = String(watch("price", String(productData.price)))
      const category = watch("category", productData.category)
      const stock = String(watch("stock", String(productData.stock)))
      const headSize = watch("headSize", productData.racket?.headSize)
      const weight = watch("weight", productData.racket?.weight)
      const racketType = watch("racketType", productData.racket?.type)
      const pattern = watch("pattern", productData.racket?.pattern)
      const shoeType = watch("shoeType", productData.shoe?.type)
      const sizes = watch("size", productData.shoe?.size || [])
      const sizeRef = useRef<HTMLInputElement>(null)
    const handleDelete = async () => {
        if(!productData) return
        try{
            const ReactS3Client = new S3({
                region: "eu-north-1",
                accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
                secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY!,
                bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME!
            })
            const list = await ReactS3Client.listFiles()
            const folderContent = list.data.Contents.filter((file: any) => file.Key.startsWith(productData.name)).map((file: any) => file.Key)
            const deletePromises = folderContent.map((filePath: string) => ReactS3Client.deleteFile(filePath))
            const deleteResponse = await Promise.all(deletePromises)
            const deletedProduct = await trpc.deleteProduct.mutate(productData.id)
        }catch(error: any) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    const addSize = () => {
        if(!sizeRef.current) return
        const size = sizeRef.current.value.trim()
        if(size && sizes) {
          setValue("size", [...sizes, size])
          sizeRef.current.value = ""
        }
      }
    const updateProduct = async (data: UpdateProductSchemaType) => {
        try{
            const updatedProduct = await trpc.updateProduct.mutate({data, productId: productData.id})
            toast.success("Product updated")
        }catch(error: any) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    if(!productData) return <></>
  return (
    <div className="flex flex-col p-10 items-center gap-2 mx-auto">
        <div className="flex gap-10 ">
            {/* <img className="w-20 h-20" src={productData.image} alt="product-img" /> */}
            <form onSubmit={handleSubmit(updateProduct)}>
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold">{productData.name}</p>
                        <Input label="Name" value={name} register={register} direction="row" id="name" type="text" />
                    <Input label="Brand" value={brand} register={register} direction="row" id="brand" type="text" />
                    <Input label="Price" value={price} register={register} direction="row" id="price" type="number" />
                    <Input label="Stock" value={stock} register={register} direction="row" id="stock" type="number" />
                    <div className="flex gap-2">
                            <h3 className="text-lg">Category</h3>
                            <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                id="RACKET"
                                value="RACKET"
                                {...register("category")}
                                checked={category === "RACKET"}
                                onChange={() => setValue("category", "RACKET")}
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
                                onChange={() => setValue("category", "SHOE")}
                            />
                            <label htmlFor="SHOE">Shoe</label>
                            </div>
                        </div>
                    </div>
                 {category === "RACKET" && (<>
                    <Input label="Racket type" value={racketType} register={register} direction="row" id="racketType" type="text" />
                    <Input label="Head size" value={headSize} register={register} direction="row" id="headSize" type="text" />
                    <Input label="Weight" value={weight} register={register} direction="row" id="weight" type="text" />
                    <Input label="Pattern" value={pattern} register={register} direction="row" id="pattern" type="text" />
                    </>
                )}
                {category === "SHOE" && (
                <div className="flex flex-col gap-4">
                    <label htmlFor="shoe-type">Shoe Type</label>
                    <select id="shoe-type" value={shoeType} {...register("shoeType")} className="border rounded-md">
                        {shoeTypes.map(shoeType => <option key={shoeType} value={shoeType}>{shoeType}</option>)}
                    </select>
                    <div>
                        <label htmlFor="size">Sizes</label>
                        {sizes && <div className="flex gap-2">
                            {sizes.map(size => <p key={size} className="bg-[#202223] rounded-md text-white px-1 text-sm">{size}</p>)}
                        </div>}
                    </div>
                    <div className="flex gap-6">
                        <input id="size" ref={sizeRef} type="number" className="focus:outline-none border-b-2 border-opacity-30 
                        focus:border-b-[#202223] transition-colors duration-300" />
                        <button type="button" onClick={addSize} className="bg-[#202223] rounded-md text-white px-1 text-sm">Add</button>
                    </div>
                </div>
                )}
                {(name !== productData.name || brand !== productData.brand || price != String(productData.price) ||
                 category !== productData.category || stock != String(productData.stock) || headSize !== productData.racket?.headSize ||
                weight !== productData.racket?.weight || pattern !== productData.racket?.pattern || racketType !== productData.racket?.type
                || shoeType !== productData.shoe?.type || (sizes && productData.shoe && sizes.join("") !== productData.shoe.size.join(""))) && 
                 <Button className="mt-4" disabled={isSubmitting} type="submit">
                    Update
                </Button>
                 }
                {Object.keys(errors).length > 0 && (
                <div className="text-red-700 text-xs p-4 font-semibold bg-red-100 w-1/4 rounded-xl">
                    {Object.entries(errors).map(([field, error]) => (
                    <p key={field}>{error.message}</p>
                    ))}
                </div>
                )}
                </form>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Main images</h1>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 items-center">
                            <img className="w-20 h-20" src={productData.image} alt="product-img" />
                            <h1 className="text-sm font-semibold">Image</h1>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <img className="w-20 h-20" src={productData.image2} alt="product-img2" />
                            <h1 className="text-sm font-semibold">Image2</h1>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">Gallery</h1>
                    <div className="flex gap-6">
                        {productData.images.length > 0 ? 
                            productData.images.map((image, i) => <img key={`img-${i}`} className="w-20 h-20" src={image} alt="product-img" />)
                            :
                            <p>No more images</p>
                        }
                    </div>
                </div>
            <button onClick={handleDelete} className="bg-red-700 rounded-lg text-white p-2">Delete product</button>
            </div>
        </div>
  )
}

export default ProductInfo