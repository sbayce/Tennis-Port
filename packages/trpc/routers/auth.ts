import { t } from "../trpc";
import registerAdminProcedure from "../auth/admin-register";

const authRouter = t.router({
    registerAdmin: registerAdminProcedure
})

export default authRouter