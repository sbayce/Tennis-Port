import DiameterIcon from '@/icons/diameter-head.svg'
import StringsIcon from '@/icons/racket-strings.svg'
import { Weight } from "lucide-react"
import { RacketInfo } from '@/types/racket'

const RacketInformation = ({ racket }: {racket: RacketInfo}) => {
  return (
    <div className="flex xl:flex-row flex-col items-center text-xs text-gray-500 absolute right-auto xl:right-0 bottom-0">
        <div className='flex flex-col items-center'>
            <DiameterIcon className='w-8 h-8' />
            <p>{racket?.headSize}</p>
        </div>
        <div className='flex flex-col items-center'>
            <StringsIcon className='w-8 h-8' />
            <p>{racket?.pattern}</p>
        </div>
        <div className='flex flex-col items-center'>
            <Weight className='w-8 h-8' strokeWidth={1} />
            <p>{racket?.weight}</p>
        </div>
    </div>
  )
}

export default RacketInformation