import BrandList from "./BrandList"
import RacketTypesFilter from "./RacketTypesFilter"

const SideBar = () => {
    return (
        <div className="p-4">
            <RacketTypesFilter />
            <BrandList />
        </div>
    )
}

export default SideBar;
