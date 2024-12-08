import { t } from "../trpc"
import getProductPrecedure from "../queries/get-product"
import searchProductsProcedure from "../queries/search-products"
import getAvailabeRacketsProcedure from '../queries/get-available-rackets'
import getProductsByIdsPrecedure from '../queries/get-products-by-ids'
import getRacketsProcedure from '../queries/get-rackets'
import getRacketBrandsProcedure from '../queries/get-racket-brands'
import getRacketTypesProcedure from '../queries/get-racket-types'

const racketRouter = t.router({
    getRackets: getRacketsProcedure,
    getProduct: getProductPrecedure,
    searchProducts: searchProductsProcedure,
    getAvailableRackets: getAvailabeRacketsProcedure,
    getProductsByIds: getProductsByIdsPrecedure,
    getRacketBrands: getRacketBrandsProcedure,
    getRacketTypes: getRacketTypesProcedure
})

export default racketRouter