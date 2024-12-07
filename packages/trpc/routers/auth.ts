import { t } from "../trpc";
import registerAdminProcedure from "../auth/admin-register";
import adminLoginProcedure from '../auth/admin-login'
import userLoginProcedure from '../auth/user-login'
import userRegisterProcedure from '../auth/user-register'

const authRouter = t.router({
    registerAdmin: registerAdminProcedure,
    adminLogin: adminLoginProcedure,
    userLogin: userLoginProcedure,
    userRegister: userRegisterProcedure
})

export default authRouter