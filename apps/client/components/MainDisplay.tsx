/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from "react"

type MainDisplayProps = {
  img1: string
  img2: string
  img3: string
}
  
const MainDisplay = ({ img1, img2, img3 }: MainDisplayProps) => {
  const plugin = useRef<any>(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  
  return (
    <Carousel plugins={[plugin.current]}>
        <CarouselContent>
            <CarouselItem>
                <img src={img1} alt="rf-wilson" className="w-full h-96 object-cover" />
            </CarouselItem>
            <CarouselItem>
                <img src={img2} alt="prince" className="w-full h-96 object-cover" />
            </CarouselItem>
            <CarouselItem>
                <img src={img3} alt="head" className="w-full h-96 object-cover" />
            </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
    </Carousel>

  )
}

export default MainDisplay