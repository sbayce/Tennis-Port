"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

const ActiveFilters = () => {
    const searchParams = useSearchParams()
    const brands = searchParams.getAll('brand')
    const racketTypes = searchParams.getAll('type')
    const filters = Array.from(searchParams.values())
    console.log("filters:", filters)
    const { replace } = useRouter()
    const pathName = usePathname();

    function removeFilter(filter: string) {
        const params = new URLSearchParams(searchParams.toString())
        const brands = params.getAll('brand')
        const types = params.getAll('type')

        if (brands.includes(filter)) {
            params.delete('brand')
            brands.filter(b => b !== filter).forEach(b => params.append('brand', b))
        }else if (types.includes(filter)) {
            params.delete('type')
            types.filter(t => t !== filter).forEach(t => params.append('type', t))
        }
        replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    return filters.length > 0 ? (
        <div className='flex gap-2 text-sm text-gray-500'>
            {filters.map(filter => (
                <div key={filter} className='border p-2 flex items-center'>
                    {filter}
                    <button onClick={() => removeFilter(filter)} className='ml-2'>
                        X
                    </button>
                </div>
            ))}
        </div>
    ) : null
}

export default ActiveFilters