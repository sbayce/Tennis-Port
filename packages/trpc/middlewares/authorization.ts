import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import jwt from "jsonwebtoken";

export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
    const { req, res } = ctx
    console.log("Cookies&&&&&&&&&&&&&&&&&&&&: ", req.headers.accesstoken);
    const token = req.headers.accesstoken as string
    console.log("token ", token);
    if (!token) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not logged in" })
    }
    try {
        const payload = jwt.verify(token, String(process.env.ACCESS_SECRET)) as jwt.JwtPayload;
        console.log("payload ", payload)
        return next({
            ctx: {
                userId: payload.userId,
                role: payload.role
            }
        });
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
});

export const isAdmin = t.middleware(async ({ ctx, next }) => {
    console.log("AUTHORIZATION: ", ctx.role)
    if (!ctx.role || ctx.role !== "ADMIN") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not an ADMIN" })
    }
    return next();
});
