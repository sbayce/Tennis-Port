import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
const MainDisplay = () => {
  return (
    <Carousel className="">
        <CarouselContent>
            <CarouselItem>
                <img src="/wilson.webp" alt="rf-wilson" className="w-full h-96 object-cover" />
            </CarouselItem>
            <CarouselItem>
                <img src="/prince.jpg" alt="prince" className="w-full h-96 object-cover" />
            </CarouselItem>
            <CarouselItem>
                <img src="/head.webp" alt="head" className="w-full h-96 object-cover" />
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>

  )
}

export default MainDisplay