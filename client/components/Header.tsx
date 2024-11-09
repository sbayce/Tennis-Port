"use client"
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import CartButton from './CartButton';
import NavMenu from "@/components/NavMenu";

const Header = () => {
  const { scrollY } = useScroll();
  const [scrollDirection,  setScrollDirection] = useState("")
  const previousScrollY = useRef(0)

  useEffect(() => {
    const cleanup = scrollY.on("change", (current) => {
      if (current > previousScrollY.current && scrollDirection !== 'down') {
        setScrollDirection("down")
      }else if (current < previousScrollY.current && scrollDirection !== 'up') {
        setScrollDirection("up")
      }
      previousScrollY.current = current; // Update the previous scroll position
    });

    return () => cleanup();
  }, [scrollY, scrollDirection]);

  return (
    <motion.div className="flex justify-between bg-white items-center top-0 fixed w-full z-20 px-2 
      sm:px-20 lg:px-20 border-b border-neutral-600]" transition={{duration: 0.2}} 
      animate={{height: scrollDirection === 'up' || !scrollDirection ? 100 : 70}}>
      <Link href="/">
        <motion.img 
          src="/tennis-port.png" 
          className="w-48"
          animate={{scale: scrollDirection === 'up' || !scrollDirection ? 1 : 0.7}}
          transition={{ type: "keyframes", stiffness: 100, damping: 100, duration: 0.2 }}
        />
      </Link>
      <div>
        <motion.input 
          type="text" 
          className="border p-2 w-96 mt-6 hidden lg:visible lg:flex ml-auto" 
          placeholder="Search for tennis stuff."
          animate={{opacity: scrollDirection === 'up' || !scrollDirection ? 1 : 0}}
          transition={{duration: 0.2}}
        />
      </div>
      <div className='flex gap-6'>
        <NavMenu />
        <CartButton />
      </div>
    </motion.div>
  );
};

export default Header;
