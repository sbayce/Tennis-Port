import { racketTypes } from "@/app/page"
import CheckItems from "./CheckItems"

const RacketTypesFilter = () => {

  return (
        <CheckItems listItems={racketTypes} paramName="type" />
    )
}

export default RacketTypesFilter