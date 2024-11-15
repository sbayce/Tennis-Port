import express from 'express'
import cors from 'cors'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import appRouter from './routers'
import { PrismaClient } from '@prisma/client'
import { createContext } from './context'
import dotenv from 'dotenv'

// declare global {
//     namespace Express {
//       interface Request {
//         context: {
//           prisma: PrismaClient;
//         };
//         userId?: string;
//       }
//     }
//   }

dotenv.config()
const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL }))

// app.use((req, res, next) => {
//     req.context = {
//         prisma: new PrismaClient()
//     }
//     next()
// })

app.use("/trpc", createExpressMiddleware({router: appRouter, createContext}))

app.listen(4000, () => {
    console.log("Listening on port 4000")
})

export type AppRouter = typeof appRouter