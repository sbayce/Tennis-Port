import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const createContext = ({req, res}: {req: Request, res: Response}) => {
    return {
        prisma,
        // userId: req.userId
    }
}

export type Context = ReturnType<typeof createContext>