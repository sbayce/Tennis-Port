import Link from "next/link"

const Footer = () => {
  return (
    <div className="h-full py-10 bg-[#232323] text-gray-300 mt-auto text-center">
      <div className="flex gap-20 items-center justify-center">
        <div className="flex flex-col">
          <h3 className="font-semibold text-white">Shop</h3>
          <div className="text-sm flex flex-col">
            <Link href='/rackets'>Rackets</Link>
            <Link href='/shoes'>Shoes</Link>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="text-sm flex flex-col">
            <a href="https://github.com/sbayce">GitHub</a>
            <a href="https://www.linkedin.com/in/youssef-khaled-farouk/">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer