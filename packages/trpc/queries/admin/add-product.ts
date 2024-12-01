import { adminProcedure } from '../../trpc'
import { newProductSchema } from '../../schemas/add-product'

export const addProductProcedure = adminProcedure.input(newProductSchema).mutation(async (req) => {
    const { prisma } = req.ctx
    const { name, brand, price, stock, image, image2, images, category, racketType, headSize, pattern, size, shoeType, weight } = req.input
    let productData: any = {
        name,
        brand,
        price: Number(price),
        stock: Number(stock),
        image: image || "",
        image2: image2 || "",
        images: images || [],
        category
    }
    if (category === "RACKET") {
        productData.racket = {
        create: {
            headSize: headSize || "",
            pattern: pattern || "",
            type: racketType || "",
            weight: weight || "",
        },
        }
    }

    if (category === "SHOE") {
        productData.shoe = {
        create: {
            size: size || [],
            type: shoeType || "MALE",
        },
        }
    }

    const product = await prisma.product.create({
        data: productData
    })
    return product
})