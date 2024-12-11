import { parseAsArrayOf, parseAsString, useQueryState, parseAsStringLiteral } from "nuqs"

export const useBrandParam = () => {
    return useQueryState<string[]>("brand", parseAsArrayOf(parseAsString, ";"))
}
export const useTypeParam = () => {
    return useQueryState<string[]>("type", parseAsArrayOf(parseAsString, ";"))
}
const shoeTypes = ["MALE", "FEMALE", "UNISEX"] as const
export const useShoeTypeParam = () => {
    return useQueryState("type", parseAsArrayOf(parseAsStringLiteral(shoeTypes), ";"))
}
export const useWeightParam = () => {
    return useQueryState<string[]>("weight", parseAsArrayOf(parseAsString, ";"))
}
export const useSizeParam = () => {
    return useQueryState<string[]>("size", parseAsArrayOf(parseAsString, ";"))
}
export const useSortParam = () => {
    return useQueryState<string>("sort", parseAsString.withDefault("featured") )
}