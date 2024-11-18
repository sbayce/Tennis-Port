import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createExpressMiddleware } from 'trpc/middlewares/trpcExpressMiddleware'
import { appRouter } from 'trpc/routers/index'
import { createContext } from 'trpc/context'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/trpc", createExpressMiddleware({router: appRouter, createContext}))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})