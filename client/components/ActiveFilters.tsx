"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const ActiveFilters = () => {
    const searchParams = useSearchParams()
    const filters = Array.from(searchParams.values())
    console.log("filters:", filters)
    const { replace } = useRouter()
    const path = usePathname();

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
        replace(`${path}?${params.toString()}`, { scroll: false })
    }

    return filters.length > 0 ? (
        <div className='flex flex-wrap gap-2 items-center text-sm text-black px-4'>
            {filters.map(filter => (
                <div key={filter} className='bg-[#41414134] p-3 rounded-3xl flex items-center'>
                    {filter}
                    <button onClick={() => removeFilter(filter)} className='ml-2'>
                        X
                    </button>
                </div>
            ))}
            { filters.length >= 2 && <Link className={`relative after:transition-all after:duration-300 ml-2 after:content-[''] after:absolute 
                after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#202223] hover:after:w-full`} 
                href={`${path}`} scroll={false}>Clear all</Link> }
        </div>
    ) : null
}

export default ActiveFilters