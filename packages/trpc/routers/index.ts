import { t } from "../trpc"
import racketRouter from "./rackets"
import shoesRouter from './shoes'
import checkoutRouter from './checkout'
import authRouter from './auth'
import adminRouter from './admin'

export const appRouter = t.mergeRouters(racketRouter, shoesRouter, checkoutRouter, authRouter, adminRouter)

export type AppRouter = typeof appRouter