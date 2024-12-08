"use client"
import { ChangeEvent, useRef, useState } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import trpc from "@/trpcClient"
import { newProductSchema } from "trpc/schemas/add-product"
import { toast } from "sonner"
import Input from "./Input"
import S3 from 'react-aws-s3-typescript'

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

  const [image, setImage] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [category, setCategory] = useState("")
  const sizeRef = useRef<HTMLInputElement>(null)
  const sizes = watch("size") || []

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (!files || files.length === 0) return
  
    if (name === "image") {
      setImage(files[0])
    } else if (name === "image2") {
      setImage2(files[0])
    } else if (name === "images") {
      setImages((prev) => [...prev, files[0]])
    }
  }

  const submitProduct = async (data: NewProductSchemaType) => {
    if (!category || !image || !image2) return
    try{
      const ReactS3Client = new S3({
        region: "eu-north-1",
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY!,
        bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME!,
        dirName: data.name
      })
      const imageURL = await ReactS3Client.uploadFile(image).then(data => {
        if ('location' in data) {
          return data.location
        }
      })
      const image2URL = await ReactS3Client.uploadFile(image2).then(data => {
        if ('location' in data) {
          return data.location
        }
      })
      const uploadPromises = images.map((image) => ReactS3Client.uploadFile(image));
      const uploadedImages = await Promise.all(uploadPromises);
      const imageURLs = uploadedImages.filter(response => 'location' in response).map(response => response.location);
      data.image = imageURL
      data.image2 = image2URL
      data.images = imageURLs
      await trpc.addProduct.mutate(data)
      reset()
      toast.success("Product created")
    }catch(error){
      console.error("Error uploading image: ", error)
    }
  }
  const addSize = () => {
    if(!sizeRef.current) return
    const size = sizeRef.current.value.trim()
    if(size) {
      setValue("size", [...sizes, size])
      sizeRef.current.value = ""
    }
  }
  return (
    <form onSubmit={handleSubmit(submitProduct)}>
        <ScrollArea className="h-[900px]">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" register={register} direction="col" id="name" type="text" />
            <Input label="Brand" register={register} direction="col" id="brand" type="text" />
            <Input label="Price" register={register} direction="col" id="price" type="text" />
            <Input label="Stock" register={register} direction="col" id="stock" type="text" />
            <div>
              <label htmlFor="image" className="mr-4 text-lg">Image</label>
              <input name="image" id="image" type="file" onChange={handleImageChange} />
            </div>
            <div>
              <label htmlFor="image2" className="mr-4 text-lg">Image 2</label>
              <input name="image2" id="image2" type="file" onChange={handleImageChange} />
            </div>
            <div>
              <label htmlFor="images" className="mr-4 text-lg">Images</label>
              <input name="images" id="images" type="file" multiple onChange={handleImageChange} />
            </div>
            <div>
              <h3 className="text-lg">Category</h3>
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
            </div>
            {category === "RACKET" && (<>
              <Input label="Racket type" register={register} direction="col" id="racketType" type="text" />
              <Input label="Head size" register={register} direction="col" id="headSize" type="text" />
              <Input label="Weight" register={register} direction="col" id="weight" type="text" />
              <Input label="Pattern" register={register} direction="col" id="pattern" type="text" />
            </>
            )}
            {category === "SHOE" && (
              <>
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
              </>
            )}
            {Object.keys(errors).length > 0 && (
              <div className="text-red-700 text-xs p-4 font-semibold bg-red-100 w-1/4 rounded-xl">
                {Object.entries(errors).map(([field, error]) => (
                  <p key={field}>{error.message}</p>
                ))}
              </div>
            )}
            <Button disabled={isSubmitting} className="self-end" type="submit">
              Add product
            </Button>
            <div className="flex gap-2 flex-wrap">
              <h3>Uploaded images</h3>
              {image && <img src={URL.createObjectURL(image)} alt="uploaded-img" className="w-32 h-32" />}
              {image2 && <img src={URL.createObjectURL(image2)} alt="uploaded-img2" className="w-32 h-32" />}
              {images && images.map((image, i) => <img key={i} src={URL.createObjectURL(image)} alt={`uploaded-img-${i}`} className="w-32 h-32" />)}
            </div>
          </div>
        </ScrollArea>
      </form>
  )
}

export default AddProductForm
