import { t } from "../trpc"

const appRouter = t.router({
    alos: t.procedure.query(async (req) => {
        const { prisma } = req.ctx
        try{
            const rackets = await prisma.racket.findMany({})
            console.log("rackets: ", rackets)
            return rackets
        }catch(e: any){
            console.log(e.message)
        }
    }),
    logToServer: t.procedure.input(v => {
        if(typeof v === 'number') return v
        throw new Error("Invalid input: expected  string")
    }).mutation(req => {
        console.log("client says: ", req.input)
        return true
    })
})

export default appRouter