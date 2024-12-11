"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const ActiveFilters = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("sort");

    // Parse all filters
    const filters: { key: string; value: string }[] = Array.from(params.entries())
        .map(([key, value]) =>
            value.split(";").map((v) => ({ key, value: v }))
        )
        .flat()

    const { replace } = useRouter();
    const path = usePathname();

    function removeFilter(filterKey: string, filterValue: string) {
        const params = new URLSearchParams(searchParams.toString())
        const currentValues = params.get(filterKey)?.split(';') || []
        const updatedValues = currentValues.filter((val) => val !== filterValue)

        if (updatedValues.length === 0) {
            params.delete(filterKey)
        } else {
            params.set(filterKey, updatedValues.join(';'))
        }
        replace(`${path}?${params.toString()}`, { scroll: false })
    }

    return filters.length > 0 ? (
        <div className="flex flex-wrap gap-2 items-center text-sm text-black px-4">
            {filters.map(({ key, value }) => (
                <div
                    key={`${key}:${value}`}
                    className="bg-[#41414134] p-3 rounded-3xl flex items-center"
                >
                    {value}
                    <button
                        onClick={() => removeFilter(key, value)}
                        className="ml-2 p-1"
                    >
                        X
                    </button>
                </div>
            ))}
            {filters.length >= 2 && (
                <Link
                    className={`relative after:transition-all after:duration-300 ml-2 after:content-[''] after:absolute 
                    after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#202223] hover:after:w-full`}
                    href={`${path}`}
                    scroll={false}
                >
                    Clear all
                </Link>
            )}
        </div>
    ) : null;
};

export default ActiveFilters;
