import { t } from "../trpc";
import registerAdminProcedure from "../auth/admin-register";
import adminLoginProcedure from '../auth/admin-login'

const authRouter = t.router({
    registerAdmin: registerAdminProcedure,
    adminLogin: adminLoginProcedure
})

export default authRouter