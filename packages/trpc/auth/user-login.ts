import { t } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from 'bcrypt'
import createToken from "../utils/create-token";

const ROLE = "MEMBER"

const userLoginProcedure = t.procedure.input(z.object({
    email: z.string(),
    password: z.string(),
})).mutation(async (req) => {
    const { prisma, res } = req.ctx
    const { email, password } = req.input
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if(!user) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid email or password." })
    }
    if ((await bcrypt.compare(password, user.password)) === false) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid email or password." })
      }
      const token = createToken(user.id, ROLE);
      res.cookie("accessToken", token.accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
      });
      res.cookie("refreshToken", token.refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
          sameSite: 'none',
          secure: true,
    })
    return { token }
})

export default userLoginProcedure