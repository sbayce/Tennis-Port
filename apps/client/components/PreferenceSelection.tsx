"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import PreferenceButton from "./PreferenceButton"

const AVAILABLE_GRIPS = ["2", "3", "4", "5"]
const STRING_OPTIONS = ["unstrung", "strung"]
// type GripSize = "2" | "3" | "4" | "5"

const PreferenceSelection = () => {
    const path = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const { replace } = useRouter()
    const gripSize = params.get("grip") || "2"
    const string = params.get("string") || "unstrung"

    const handleGripChnage = (grip: string) => {
        params.set("grip", grip)
        replace(`${path}?${params.toString()}`, {scroll: false})
    }
    const handleStringChange = (string: string) => {
        params.set("string", string)
        replace(`${path}?${params.toString()}`, {scroll: false})
    }

  return (
    <div className="flex flex-col gap-4">
        <h3>Grip Size:</h3>
        <div className="flex gap-2 flex-wrap">
            {AVAILABLE_GRIPS.map((size) => <PreferenceButton key={size} option={size} isActive={gripSize === size} onClick={handleGripChnage} />)}
        </div>
        <h3>String Options:</h3>
        <div className="flex gap-2 flex-wrap">
            {STRING_OPTIONS.map((option) => <PreferenceButton key={option} option={option} isActive={string === option} onClick={handleStringChange} />)}
        </div>
    </div>
  )
}

export default PreferenceSelection