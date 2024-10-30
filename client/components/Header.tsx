import Link from "next/link"

const Header = () => {
  return (
    <div className="flex justify-between bg-white items-center mb-10 top-0 sticky z-20 px-2 sm:px-10 md:px-32 lg:px-auto">
        <Link href='/'>
          <img src="/logo.png" className="w-48" />
        </Link>
        <div>
            <input type="text" className="border p-2 w-96" placeholder="Search for tennis stuff." />
        </div>
        <button>Cart</button>
    </div>
  )
}

export default Header