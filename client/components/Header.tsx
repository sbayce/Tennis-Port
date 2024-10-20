import Link from "next/link"

const Header = () => {
  return (
    <div className="flex justify-between pt-4 items-center mb-10">
        <Link href='/'>
          <img src="/newLogo.png" className=" w-48" />
        </Link>
        <div>
            <input type="text" className="border p-2 w-96" placeholder="Search for tennis stuff." />
        </div>
        <button>Cart</button>
    </div>
  )
}

export default Header