import { t } from "../trpc"
import { z } from "zod"

const createOrderProcedure = t.procedure.input(z.object({
    customerEmail: z.string(),
    amount: z.number(),
    productIds: z.array(z.string()),
    purchasedProducts: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number()
        })
    ),
    adress: z.object({
        city: z.string(),
        country: z.string(),
        line1: z.string(),
        line2: z.string(),
        postal_code: z.string(),
        state: z.string()
    })
    })).mutation(async (req) => {
        console.log("request: ", req)
        try{
            const { prisma } = req.ctx
            const { customerEmail, productIds, amount, purchasedProducts, adress } = req.input
            
            console.log("customerEmail: ", customerEmail)
            console.log("amount: ", amount)
            console.log("productIds: ", productIds)
            console.log("purchasedProducts: ", purchasedProducts)
            const productPrices = await prisma.product.findMany({
                where: {
                    id: {
                        in: productIds
                    }
                },
                select: {
                    price: true
                }
            })
            const order = await prisma.order.create({
                data: {
                    items: {
                        createMany: {
                            data: purchasedProducts.map((product, i) => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                price: productPrices[i].price,
                            }))
                        }
                    },
                    customerEmail,
                    status: "PENDING",
                    totalAmount: amount,
                    adress: {
                        create: {
                            adress1: adress.line1,
                            adress2: adress.line2 || undefined,
                            country: adress.country,
                            city: adress.city,
                            postalCode: adress.postal_code
                        }
                    }
                }
            })
        console.log("created order: ", order)
    }catch(error: any) {
        console.log("Order creation failed: ", error.message)
        return { status: 500, message: error.message }
    }
})

export default createOrderProcedure