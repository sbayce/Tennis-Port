import { t } from "../trpc";

const getAvailableShoesProcedure = t.procedure.query(async (req) => {
    const { prisma } = req.ctx

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
    }));
    const sizeMap = sizeCountRaw
        .flatMap((shoe) => shoe.size) // Flatten the array of sizes
        .reduce((acc, size) => {
            acc[size] = (acc[size] || 0) + 1; // Count occurrences
            return acc;
        }, {} as Record<string, number>);

        const sizeCount = Object.entries(sizeMap)
        .map(([size, count]) => ({ label: size, count }))
        .sort((a, b) => a.label.localeCompare(b.label)); // Sort sizes
    console.log("size: ", sizeCountRaw)
    // const sizeCount = sizeCountRaw.map(({ _count, size }) => ({
    //     label: size,
    //     count: _count.size,
    // }));
    const brandsCount = brandCountRaw.map(({ _count, brand }) => ({
        label: brand,
        count: _count.brand,
    }));

    return { typesCount, sizeCount, brandsCount }
})

export default getAvailableShoesProcedure