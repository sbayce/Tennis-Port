
type ProductsGridProps = {
    products: any[]
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {products.map(product =>
            <div key={product.name} className="border rounded-sm p-6 flex">
                <img className="w-24 md:w-32 lg:w-44 h-24 md:h-32 lg:h-44" src={product.image} alt="product-img" />
                <div className="flex flex-col gap-4">
                    <img className="w-14" src={product.brand} alt="product-brand" />
                    <p>{product.type}</p>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <p>{product.rating}</p>
                    <div className="flex gap-2">
                        <p>{product.width}</p>
                        <p>{product.height}</p>
                        <p>{product.weight}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductsGrid