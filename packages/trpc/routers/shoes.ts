import { t } from "../trpc";
import getShoesProcedure from "../queries/get-shoes";
import getAvailableShoesProcedure from '../queries/get-available-shoes'

const shoesRouter = t.router({
    getShoes: getShoesProcedure,
    getAvailableShoes: getAvailableShoesProcedure
})

export default shoesRouter