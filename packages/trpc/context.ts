import { PrismaClient } from "@prisma/client";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

const prisma = new PrismaClient()

export const createContext = ({req, res}: CreateExpressContextOptions) => {
    return {
        prisma,
        req,
        res,
        userId: undefined as string | undefined,
        role: undefined as string | undefined,
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
