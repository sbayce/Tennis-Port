import { t } from "../trpc"
import { z } from "zod"

const createOrderProcedure = t.procedure.input(z.object({
    userId: z.string().optional(),
    customerEmail: z.string(),
    amount: z.number(),
    purchasedProducts: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number(),
            gripSize: z.string().optional(),
            stringOption: z.string().optional(),
            shoeSize: z.string().optional()
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
        try{
            const { prisma } = req.ctx
            const { userId, customerEmail, amount, purchasedProducts, adress } = req.input

            const userDetails: any = {}
            if(userId) {
                userDetails.user = {
                    connect: {
                        id: userId
                    }
                }
            }else{
                userDetails.customerEmail = customerEmail
            }
            
            const productIds = purchasedProducts.map(product => product.productId)
            const products = await prisma.product.findMany({
                where: {
                    id: {
                        in: productIds
                    }
                },
                select: {
                    id: true,
                    price: true,
                    image: true,
                    name: true
                }
            })
            const order = await prisma.order.create({
                data: {
                    items: {
                        createMany: {
                            data: purchasedProducts.map((product, i) => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                price: products[i].price,
                                gripOption: product.gripSize,
                                stringOption: product.stringOption,
                                shoeSize: product.shoeSize 
                            }))
                        }
                    },
                    ...userDetails,
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
        return { order, products }
    }catch(error: any) {
        console.log("Order creation failed: ", error.message)
        throw new Error(error.message)
    }
})

export default createOrderProcedure