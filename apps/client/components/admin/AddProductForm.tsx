"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import trpc from "@/trpcClient";
import { newProductSchema } from "trpc/schemas/add-product";

type NewProductSchemaType = z.infer<typeof newProductSchema>

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewProductSchemaType>({
    resolver: zodResolver(newProductSchema),
    shouldFocusError: false,
  });

  const [category, setCategory] = useState<string>("");

  const submitProduct = async (data: NewProductSchemaType) => {
    if (!category) return;
    console.log("Submitting data: ", data);
    const product = await trpc.addProduct.mutate(data)
    console.log("added product: ", product)
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitProduct)} className="flex flex-col gap-2">
  {/* Form Fields */}
  <label htmlFor="name">Name</label>
  <input id="name" {...register("name")} type="text" className="border" />

  <label htmlFor="brand">Brand</label>
  <input id="brand" {...register("brand")} type="text" className="border" />

  <label htmlFor="price">Price</label>
  <input id="price" {...register("price")} type="number" className="border" />

  <label htmlFor="stock">Stock</label>
  <input id="stock" {...register("stock")} type="number" className="border" />

  <label htmlFor="image">Image</label>
  <input id="image" {...register("image")} type="text" className="border" />

  <RadioGroup
    value={category}
    onValueChange={(val) => setCategory(val)}
    {...register("category")}
    defaultValue=""
  >
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="RACKET" id="RACKET" />
      <label htmlFor="RACKET">Racket</label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="SHOE" id="SHOE" />
      <label htmlFor="SHOE">Shoe</label>
    </div>
  </RadioGroup>

  {category === "RACKET" && (
    <div className="flex flex-col gap-2">
      <label htmlFor="type">Type</label>
      <input id="type" {...register("type")} type="text" className="border" />

      <label htmlFor="headSize">Head Size</label>
      <input id="headSize" {...register("headSize")} type="text" className="border" />

      <label htmlFor="weight">Weight</label>
      <input id="weight" {...register("weight")} type="text" className="border" />

      <label htmlFor="pattern">Pattern</label>
      <input id="pattern" {...register("pattern")} type="text" className="border" />
    </div>
  )}

  {category === "SHOE" && (
    <div className="flex flex-col gap-2">
      <label htmlFor="type">Type</label>
      <input id="type" {...register("type")} type="text" className="border" />

      <label htmlFor="size">Sizes</label>
      <input id="size" {...register("size.0")} type="text" className="border" />
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

  );
};

export default AddProductForm;
