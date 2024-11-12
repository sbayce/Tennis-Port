

const ProductCheckoutPage = ({ searchParams }: { searchParams: {
  productName: string,
  image: string,
  gripSize: string,
  stringOption: string
} }) => {
  console.log("got params: ", searchParams)
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-4 ml-auto">
        <label>email</label>
        <input className="border" />
        <label>address</label>
        <input className="border" />
        <label>phone</label>
        <input className="border" />
      </div>
      <div className="flex flex-col gap-2 mr-auto">
        <div className="flex gap-2 items-center">
          <img className="h-20 w-20 border rounded-lg" src={searchParams.image} alt="product-img" />
          <div>
            <p>{searchParams.productName}</p>
            <p className="text-xs">Grip: {searchParams.gripSize}</p>
            <p className="text-xs">String option: {searchParams.stringOption}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCheckoutPage