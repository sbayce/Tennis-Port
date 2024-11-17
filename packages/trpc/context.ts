import { PrismaClient } from "@prisma/client";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

const prisma = new PrismaClient()

export const createContext = ({req, res}: CreateExpressContextOptions) => {
    return {
        prisma,
        // userId: req.userId
    }
}

export type Context = ReturnType<typeof createContext>