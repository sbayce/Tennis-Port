import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import Product from "@/types/product"
  
const ProductCarousel = ({ racketData }: { racketData: Product }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-20">
            <div className="flex flex-row xl:flex-col gap-4">
                <img className="w-[100px] h-[100px] object-cover" src={racketData.image} alt="main-image" />
                <img className="w-[100px] h-[100px] object-cover" src={racketData.image2} alt="sec-image" />
                {racketData.images.map((image, i) => <img key={`image-${i}`} className="w-[100px] h-[100px] object-cover" src={image} alt="carousel-image" />)}
            </div>
            <Carousel className="w-full">
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
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
  )
}

export default ProductCarousel