import { z } from 'zod'

export const StripeMetadata = z.array(
    z.object({
        productId: z.string(),
        quantity: z.number(),
        gripSize: z.string().optional(),
        stringOption: z.string().optional(),
        shoeSize: z.string().optional()
    })
)