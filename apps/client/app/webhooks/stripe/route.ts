import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'
import trpc from "@/trpcClient";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
    )
    if(event.type === "charge.succeeded") {
        const charge = event.data.object
        const email = charge.billing_details.email!
        const amount = charge.amount/100
        
        const shippingAdress = charge.shipping?.address
        if (!shippingAdress) {
            return NextResponse.json(
              { error: "Shipping address is required" },
              { status: 400 }
            );
        }
        console.log("Customer adress: ", shippingAdress)
        const adress = {
            city: shippingAdress.city ?? "",
            country: shippingAdress.country ?? "",
            line1: shippingAdress.line1 ?? "",
            line2: shippingAdress.line2 ?? "",
            postal_code: shippingAdress.postal_code ?? "",
            state: shippingAdress.state ?? "",
        };
        const productIds: string[] = [];
        const purchasedProducts: { productId: string; quantity: number }[] = [];

        for (let i = 1; charge.metadata[`product_${i}_id`]; i++) {
            const productId = charge.metadata[`product_${i}_id`];
            const quantity = parseInt(charge.metadata[`product_${i}_quantity`], 10);
            productIds.push(productId);
            purchasedProducts.push({ productId, quantity });
        }
        await trpc.createOrder.mutate({customerEmail: email, amount, productIds, purchasedProducts, adress})
    }
    return new NextResponse()
}