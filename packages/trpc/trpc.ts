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
    try{
        if(token) {
            const payload = jwt.verify(token, String(process.env.ACCESS_SECRET)) as jwt.JwtPayload
            if(payload) {
                return next({
                    ctx: {
                        userId: payload.userId,
                        role: payload.role
                    }
                })
            }
            return next()
        }
        return next()
    }catch(error) {
        return next()
    }
})

export const isAdmin = t.middleware(async ({ ctx, next }) => {
    if (!ctx.role || ctx.role !== "ADMIN") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not an ADMIN" })
    }
    return next();
});


export const authProcedure = publicProcedure.use(isAuthenticated)
export const guestOrUserProcedure = publicProcedure.use(isGuestOrUser)
export const adminProcedure = authProcedure.use(isAdmin)
