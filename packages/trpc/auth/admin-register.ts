import { t } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from 'bcrypt'
import createToken from "../utils/create-token";

const ROLE = "ADMIN"

const registerAdminProcedure = t.procedure.input(z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
})).mutation(async (req) => {
    const { prisma, res } = req.ctx
    const { name, email, password } = req.input
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(existingUser) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User already exists." })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: ROLE
        },
      });
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

export default registerAdminProcedure