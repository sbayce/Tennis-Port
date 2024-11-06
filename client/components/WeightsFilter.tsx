import { racketWeights } from "@/app/page"
import CheckItems from "./CheckItems"

const WeightsFilter = () => {

  return (
        <CheckItems listItems={racketWeights} paramName="weight" />
    )
}

export default WeightsFilter