"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Product from "@/types/product"
  import { type CarouselApi } from "@/components/ui/carousel"
import { useEffect, useState } from "react"
  
const ProductCarousel = ({ racketData }: { racketData: Product }) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])
  const handleImageClick = (index: number) => {
    if (api) {
      api.scrollTo(index)
    }
  }
  console.log("current: ", current)
  return (
    <div className="flex flex-col xl:flex-row gap-20">
            <div className="flex flex-row order-2 xl:order-1 xl:flex-col gap-4">
                <img onClick={() => handleImageClick(0)} className={`w-[100px] h-[100px] object-cover cursor-pointer pb-4 border-b-2 transition-colors 
                    duration-300 ${current === 0? "border-[#202223]" : "border-transparent"}`} src={racketData.image} alt="main-image" />
                <img onClick={() => handleImageClick(1)} className={`w-[100px] h-[100px] object-cover cursor-pointer pb-4 border-b-2 transition-colors 
                    duration-300 ${current === 1? "border-[#202223]" : "border-transparent"}`} src={racketData.image2} alt="sec-image" />
                {racketData.images.map((image, i) => <img key={`image-${i+2}`} onClick={() => handleImageClick(i+2)} 
                    className={`w-[100px] h-[100px] object-cover cursor-pointer pb-4 border-b-2 transition-colors 
                    duration-300 ${current === i+2? "border-[#202223]" : "border-transparent"}`} src={image} alt="carousel-image" />)}
            </div>
            <Carousel setApi={setApi} className="w-full order-1 xl:order-2">
                <CarouselContent>
                    <CarouselItem>
                        <img className="w-full h-full object-cover" src={racketData.image} alt="main-carousel-image" />
                    </CarouselItem>
                    <CarouselItem>
                    <img className="w-full h-full object-cover" src={racketData.image2} alt="sec-carousel-image" />
                    </CarouselItem>
                    {racketData.images.map((image, i) => <CarouselItem key={`carousel-image-${i}`}>
                        <img className="w-full h-full object-cover" src={image} alt="carousel-image" />
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious className="ml-10 sm:ml-0" />
                <CarouselNext className="mr-10 sm:mr-0" />
            </Carousel>
        </div>
  )
}

export default ProductCarousel