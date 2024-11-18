import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from 'trpc/middlewares/trpcExpressMiddleware'
import { appRouter } from 'trpc/routers/index'
import { createContext } from 'trpc/context'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.use("/trpc", createExpressMiddleware({router: appRouter, createContext}))

app.listen(4000, () => {
    console.log("Listening on port 4000")
})