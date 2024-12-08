import { t } from "../trpc";
import getShoesProcedure from "../queries/get-shoes";
import getAvailableShoesProcedure from '../queries/get-available-shoes'
import getShoeBrandsProcedure from '../queries/get-shoe-brands'

const shoesRouter = t.router({
    getShoes: getShoesProcedure,
    getAvailableShoes: getAvailableShoesProcedure,
    getShoeBrands: getShoeBrandsProcedure
})

export default shoesRouter