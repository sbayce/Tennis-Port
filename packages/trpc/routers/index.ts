import { t } from "../trpc"
import racketRouter from "./rackets"

const randomRouter = t.router({
    sayAlo: t.procedure.query(() => {
        return "aloo"
    }),
    logToServer: t.procedure.input(v => {
        if(typeof v === 'number') return v
        throw new Error("Invalid input: expected  string")
    }).mutation(req => {
        console.log("client says: ", req.input)
        return true
    })
})

export const appRouter = t.mergeRouters(randomRouter, racketRouter) // ,checkoutRouter

export type AppRouter = typeof appRouter