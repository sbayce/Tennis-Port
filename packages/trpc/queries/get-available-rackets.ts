import { t } from "../trpc";

const getAvailableRacketsProcedure = t.procedure.query(async (req) => {
    const { prisma } = req.ctx
    const [typeCountRaw, weightCountRaw, brandCountRaw] = await Promise.all([
        prisma.racket.groupBy({
            by: ["type"],
            _count: { type: true },
            where: {
                product: {
                    stock: {
                        gt: 0
                    }
                }
            },
            orderBy: { type: "asc" },
        }),
        prisma.racket.groupBy({
            by: ["weight"],
            _count: { weight: true },
            where: {
                product: {
                    stock: {
                        gt: 0
                    }
                }
            },
            orderBy: { weight: "asc" },
        }),
        prisma.product.groupBy({
            by: ["brand"],
            _count: { brand: true },
            where: { 
                category: "RACKET",
                stock: {
                    gt: 0
                }
             },
            orderBy: { brand: "asc" },
        }),
    ])
    // Restructure data for better readability
    const typesCount = typeCountRaw.map(({ _count, type }) => ({
        label: type,
        count: _count.type,
    }));
    const weightsCount = weightCountRaw.map(({ _count, weight }) => ({
        label: weight,
        count: _count.weight,
    }));
    const brandsCount = brandCountRaw.map(({ _count, brand }) => ({
        label: brand,
        count: _count.brand,
    }));

    return { typesCount, weightsCount, brandsCount }
})

export default getAvailableRacketsProcedure