import { useState, useRef } from "react"
import { DualRangeSlider } from "./ui/dual-range-slider"
import FadeInMotionDiv from "./framer/FadeInMotionDiv"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const MIN_PRICE = 0
const MAX_PRICE = 20000

const PriceFilter = () => {
  const path = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const minQuery = Number(searchParams.get("price.min")) || MIN_PRICE
  const maxQuery = Number(searchParams.get("price.max")) || MAX_PRICE
  const [priceRange, setPriceRange] = useState<number[]>([minQuery, maxQuery])
  let previousMin = MIN_PRICE
  let previousMax = MAX_PRICE
  const minInputRef = useRef<HTMLInputElement>(null)
  const maxInputRef = useRef<HTMLInputElement>(null)
  

  // function to update prince range based on which filed was submitted (min or max)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    let value = type === 'max' && e.target.value === ''? MAX_PRICE : Number(e.target.value) // if no value entered at max -> defaults to MAX_PRICE
    
    // skip if values didn't change
    // if( (type === 'min' && previousMin === value) || (type === 'max' && previousMax === value) ){
    //   return
    // }

    if(type === 'min' && value >= priceRange[1]){
      value = priceRange[1] - 1
    }

    if(type === 'max' && value <= priceRange[0]){
      value = priceRange[0] + 1
    }
    previousMin = type === 'min'? value : previousMin
    previousMax = type === 'max'? value : previousMax
    setPriceRange(prev => {
      const updatedPrice = [...prev]
      console.log("updated: ", updatedPrice)
      const index = type === "min"? 0 : 1
      updatedPrice[index] = value
      return updatedPrice
    })
    const params = new URLSearchParams(searchParams.toString())
    if(type === 'min' && value === MIN_PRICE) {
      params.delete('price.min')
      return replace(`${path}?${params.toString()}`, {scroll: false})
    }
    if(type === 'max' && value === MAX_PRICE) {
      params.delete('price.max')
      return replace(`${path}?${params.toString()}`, {scroll: false})
    }
    params.set(`price.${type}`, String(value))
    replace(`${path}?${params.toString()}`, {scroll: false})
    console.log(params.toString())
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement>) {
    if (e.key === "Enter") ref.current?.blur()
  }
function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') {
  const value = type === 'max' && e.target.value === ''? MAX_PRICE : Number(e.target.value) // if no value entered at max -> defaults to MAX_PRICE
  setPriceRange(prev => {
    const updatedPrice = [...prev]
    const index = type === "min"? 0 : 1
    updatedPrice[index] = value
    return updatedPrice
  })
}

  console.log(priceRange)
  return (
      <FadeInMotionDiv className='flex flex-col gap-4 items-center px-2 mt-4'>
          <DualRangeSlider
            value={priceRange}
            onValueChange={setPriceRange}
            onValueCommit={() => console.log("commit")}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={1}
          />
          <div className="flex gap-2">
              <input ref={minInputRef} value={priceRange[0] !== MIN_PRICE ? priceRange[0] : ""} 
                onChange={(e) => handleOnChange(e, "min")} placeholder={String(MIN_PRICE)} 
                onKeyDown={(e) => handleKeyDown(e, minInputRef)} onBlur={(e) => handleChange(e, "min")} 
                min={MIN_PRICE} max={MAX_PRICE} className="border rounded-xl py-3 px-2 w-20 text-sm text-center" 
                type="number" name="min-price" />

              <input ref={maxInputRef} value={priceRange[1] !== MAX_PRICE ? priceRange[1] : ""} 
                onChange={(e) => handleOnChange(e, "max")} placeholder={String(MAX_PRICE)} 
                onKeyDown={(e) => handleKeyDown(e, maxInputRef)} onBlur={(e) => handleChange(e, "max")} 
                min={MIN_PRICE} max={MAX_PRICE} className="border rounded-xl py-3 px-2 w-20 text-sm text-center" 
                type="number" name="max-price" />
          </div>
      </FadeInMotionDiv>
  )
}

export default PriceFilter