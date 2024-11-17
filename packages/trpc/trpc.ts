import { initTRPC } from '@trpc/server'
import { Context } from './context'
import dotenv from 'dotenv'
dotenv.config()

console.log("trBC: ", process.env.STRIPE_SECRET_KEY)

export const t = initTRPC.context<Context>().create()