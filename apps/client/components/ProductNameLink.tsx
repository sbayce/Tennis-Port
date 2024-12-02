import Link from "next/link"
const ProductNameLink = ({ productId, name }: { productId: string, name: string }) => {
  return (
    <Link href={`/product/${productId}`} className="relative after:transition-all after:duration-300 after:content-[''] after:absolute 
                after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[#202223] hover:after:w-full font-semibold">
        {name}
    </Link>
  )
}

export default ProductNameLink