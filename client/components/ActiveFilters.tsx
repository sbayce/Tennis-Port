"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

const ActiveFilters = () => {
    const searchParams = useSearchParams()
    const filters = Array.from(searchParams.values())
    console.log("filters:", filters)
    const { replace } = useRouter()
    const pathName = usePathname();

    function removeFilter(filter: string) {
        console.log("filter: ", filter)
        const params = new URLSearchParams(searchParams.toString())
        params.entries().forEach(p => {
            if(p[1] === filter) {
                const paramValues = params.getAll(p[0])
                params.delete(p[0])
                paramValues.filter(val => val !== filter).forEach(val => params.append(p[0], val))
            }
        })
        replace(`${pathName}?${params.toString()}`, { scroll: false })
    }

    return filters.length > 0 ? (
        <div className='flex gap-2 text-sm text-black px-4'>
            {filters.map(filter => (
                <div key={filter} className='bg-[#41414134] p-3 rounded-3xl flex items-center'>
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