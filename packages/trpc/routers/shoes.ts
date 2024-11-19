import { t } from "../trpc";
import getShoesProcedure from "../queries/get-shoes";

const shoesRouter = t.router({
    getShoes: getShoesProcedure
})

export default shoesRouter