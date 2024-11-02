"use client"
import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import CartButton from './CartButton';

const Header = () => {
  const { scrollY } = useScroll();
  const [logoScale, setLogoScale] = useState(1);
  const [searchOpacity, setSearchOpacity] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(100);
  let previousScrollY = 0; // Track the previous scroll position

  useEffect(() => {
    const cleanup = scrollY.on("change", (current) => {
      if (current > previousScrollY && logoScale > 0.7) {
        setLogoScale(prev => Math.max(prev - 0.02, 0.7));
        setSearchOpacity(prev => Math.max(prev - 0.07, 0));
        setHeaderHeight(prev => Math.max(prev - 2, 70));
      } else if (current < previousScrollY) {
        setLogoScale(prev => Math.min(prev + 0.02, 1));
        setSearchOpacity(prev => Math.min(prev + 0.07, 1));
        setHeaderHeight(prev => Math.min(prev + 2, 100));
      }
      previousScrollY = current; // Update the previous scroll position
    });

    return () => cleanup();
  }, [scrollY]); // Only depend on scrollY

  console.log("oapcity: ", searchOpacity);

  return (
    <motion.div className="flex justify-between bg-white items-center mb-10 top-0 sticky z-20 px-2 sm:px-10 md:px-32 lg:px-auto overflow-hidden border-b border-neutral-600]" style={{ height: headerHeight }}>
      <Link href="/">
        <motion.img 
          src="/logo.png" 
          className="w-48"
          animate={{scale: logoScale}}
          transition={{ type: "keyframes", stiffness: 100, damping: 100, duration: 0.1 }}
        />
      </Link>
      <div>
        <motion.input 
          type="text" 
          className="border p-2 w-96" 
          placeholder="Search for tennis stuff."
          style={{opacity: searchOpacity}}
        />
      </div>
      <CartButton />
    </motion.div>
  );
};

export default Header;
