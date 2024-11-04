import BrandsFilter from "./BrandsFilter";
import RacketTypesFilter from "./RacketTypesFilter"
import PriceFilter from "./PriceFilter";

const SideBar = () => {
    return (
        <div className="p-4 sticky h-screen top-24 flex flex-col gap-4">
            <RacketTypesFilter />
            <BrandsFilter />
            <PriceFilter />
        </div>
    )
}

export default SideBar;
