/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from "react"
  
const MainDisplay = () => {
  const plugin = useRef<any>(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  
  return (
    <Carousel plugins={[plugin.current]}>
        <CarouselContent>
            <CarouselItem>
                <img src="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/wilson.webp" alt="rf-wilson" className="w-full h-96 object-cover" />
            </CarouselItem>
            <CarouselItem>
                <img src="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/prince.jpg" alt="prince" className="w-full h-96 object-cover" />
            </CarouselItem>
            <CarouselItem>
                <img src="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/head.webp" alt="head" className="w-full h-96 object-cover" />
            </CarouselItem>
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
    </Carousel>

  )
}

export default MainDisplay