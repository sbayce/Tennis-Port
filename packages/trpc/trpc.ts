import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from './context'
import jwt from "jsonwebtoken";

export const t = initTRPC.context<Context>().create()


export const publicProcedure = t.procedure

export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
    const { req, res } = ctx
    const token = req.headers['accesstoken']?.toString() ?? req.cookies.accessToken;
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

export const isGuestOrUser = t.middleware(async ({ ctx, next }) => {
    const { req, res } = ctx
    const token = req.headers['accesstoken']?.toString() ?? req.cookies.accessToken
    if(token) {
        const payload = jwt.verify(token, String(process.env.ACCESS_SECRET)) as jwt.JwtPayload
        return next({
            ctx: {
                userId: payload.userId,
                role: payload.role
            }
        })
    }
    return next()
})

export const isAdmin = t.middleware(async ({ ctx, next }) => {
    console.log("AUTHORIZATION: ", ctx.role)
    if (!ctx.role || ctx.role !== "ADMIN") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not an ADMIN" })
    }
    return next();
});


export const authProcedure = publicProcedure.use(isAuthenticated)
export const guestOrUserProcedure = publicProcedure.use(isGuestOrUser)
export const adminProcedure = authProcedure.use(isAdmin)
