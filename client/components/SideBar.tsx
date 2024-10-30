import BrandsFilter from "./BrandsFilter";
import RacketTypesFilter from "./RacketTypesFilter"

const SideBar = () => {
    return (
        <div className="p-4">
            <RacketTypesFilter />
            <BrandsFilter />
        </div>
    )
}

export default SideBar;
