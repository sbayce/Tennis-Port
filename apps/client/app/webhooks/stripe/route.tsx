/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import Stripe from 'stripe'
import trpc from "@/trpcClient"
import { StripeMetadata } from "trpc/types/stripe-metadata"
import { z } from 'zod'
import { Resend } from 'resend'
import PurchaseReceiptEmail from "@/app/email/PurchaseReceipt"
import { getEgpRate } from "@/utils/get-egp-rate"

type StripeMetadataType = z.infer<typeof StripeMetadata>

const stripe = new Stripe(String(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY))
const resend =  new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!)

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
    )
    if(event.type === "charge.succeeded") {
        const charge = event.data.object
        const email = charge.billing_details.email!
        const usdToEgpRate = await getEgpRate()
        const amount = (charge.amount/100) * usdToEgpRate
        
        const shippingAdress = charge.shipping?.address
        if (!shippingAdress) {
            return NextResponse.json(
              { error: "Shipping address is required" },
              { status: 400 }
            )
        }
        console.log("Customer adress: ", shippingAdress)
        const adress = {
            city: shippingAdress.city ?? "",
            country: shippingAdress.country ?? "",
            line1: shippingAdress.line1 ?? "",
            line2: shippingAdress.line2 ?? "",
            postal_code: shippingAdress.postal_code ?? "",
            state: shippingAdress.state ?? "",
        }

        const purchasedProducts: StripeMetadataType = JSON.parse(charge.metadata.products)

        const { order, products } = await trpc.createOrder.mutate({customerEmail: email, amount, purchasedProducts, adress})
        const productsData = products.map(product => {
            const purchasedProductIndex = purchasedProducts.findIndex(p => p.productId === product.id)
            return {
                ...product,
                ...purchasedProducts[purchasedProductIndex]
            }
        })
        await resend.emails.send({
            from: process.env.NEXT_PUBLIC_SENDER_EMAIL!,
            to: "delivered@resend.dev",
            // to: email,
            subject: "Order Conformation",
            react: <PurchaseReceiptEmail products={productsData} address={adress} order={order} />
        })
    }
    return new NextResponse()
}