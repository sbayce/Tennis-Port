import { t } from "../trpc"

const getAvailableShoesProcedure = t.procedure.query(async (req) => {
    const { prisma } = req.ctx
    try{
        const [brandCountRaw, sizeCountRaw, typeCountRaw] = await Promise.all([
            prisma.product.groupBy({
                by: ["brand"],
                _count: {
                    brand: true
                },
                where: {
                    category: "SHOE",
                    stock: {
                        gt: 0
                    }
                },
                orderBy: {
                    brand: "asc"
                }
            }),
            prisma.shoe.groupBy({
                by: ["size"],
                _count: {
                    size: true
                },
                where: {
                    product: {
                        stock: {
                            gt: 0
                        }
                    }
                },
                orderBy: {
                    size: "asc"
                }
            }),
            prisma.shoe.groupBy({
                by: ["type"],
                _count: {
                    type: true
                },
                where: {
                    product: {
                        stock: {
                            gt: 0
                        }
                    }
                },
                orderBy: {
                    type: "asc"
                }
            })
        ])    
        // Restructure data for better readability
        const typesCount = typeCountRaw.map(({ _count, type }) => ({
            label: type,
            count: _count.type,
        }))
        const sizeMap = sizeCountRaw
            .flatMap((shoe) => shoe.size) // Flatten the array of sizes
            .reduce((acc, size) => {
                acc[size] = (acc[size] || 0) + 1 // Count occurrences
                return acc
            }, {} as Record<string, number>)

            const sizeCount = Object.entries(sizeMap)
            .map(([size, count]) => ({ label: size, count }))
            .sort((a, b) => a.label.localeCompare(b.label)) // Sort sizes
        const brandsCount = brandCountRaw.map(({ _count, brand }) => ({
            label: brand,
            count: _count.brand,
        }))

        return { typesCount, sizeCount, brandsCount }
    }catch(error: any) {
        console.error("Error fetching available shoes:", error.message)
        throw new Error("Failed to fetch available shoes.")
    }
})

export default getAvailableShoesProcedure