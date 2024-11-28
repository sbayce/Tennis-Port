import { z } from 'zod'

export const newProductSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    stock: z.string().min(1, { message: "Stock is required" }),
    image: z.string().optional(),
    image2: z.string().optional(),
    images: z.string().optional(),
    category: z.enum(["RACKET", "SHOE"]),
    headSize: z.string().min(1, { message: "Head size is required" }).optional(),
    weight: z.string().min(1, { message: "Weight is required" }).optional(),
    pattern: z.string().min(1, { message: "Pattern is required" }).optional(),
    size: z
    .array(z.string().min(1, { message: "Size cannot be empty" }))
    .nonempty({ message: "At least one size is required" })
    .optional(),
    type: z.string().min(1, { message: "Type is required" }).optional(),
}).refine(
    (data) =>
      (data.category === "RACKET" &&
        data.headSize &&
        data.weight &&
        data.pattern &&
        data.type) ||
      (data.category === "SHOE" && data.size && data.type),
    {
      message:
        "Provide product details.",
      path: ["category"],
    }
  );