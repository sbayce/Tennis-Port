"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { racketBrands, racketTypes } from "@/app/page"
import Link from "next/link"
import { motion } from "framer-motion"

const staggerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
      duration: 0.1,
      when: "beforeChildren"
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold">Rackets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <>
                    <h3 className="font-semibold">Types</h3>
                    <motion.div variants={staggerVariants} initial="hidden" animate="visible" className="mt-4 flex flex-col gap-2 text-sm">
                      {racketTypes.map(racketType => 
                        <motion.div key={racketType} variants={itemVariants}>
                          <Link href={`/?type=${racketType}`} className="hover:text-zinc-500 transition-colors duration-200 ease-in-out">{racketType}</Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <>
                    <h3 className="font-semibold">Brands</h3>
                    <motion.div initial="hidden" animate="visible" variants={staggerVariants} className="mt-4 flex flex-col gap-2 text-sm">
                      {racketBrands.map(racketBrand => 
                        <motion.div key={racketBrand} variants={itemVariants}>
                          <Link href={`/?brand=${racketBrand.brand}`} className="hover:text-zinc-500 transition-colors duration-200 ease-in-out">{racketBrand.brand}</Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold">Strings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-6">
              <h3 className="font-semibold">Brands</h3>
              <motion.ul initial="hidden" animate="visible" variants={staggerVariants} className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] text-sm">
                {racketBrands.map((racketBrand) => (
                  <motion.div key={racketBrand.brand} variants={itemVariants}>
                    <Link href={`/?brand=${racketBrand.brand}`} className="hover:text-zinc-500 transition-colors duration-200 ease-in-out">{racketBrand.brand}</Link>
                  </motion.div>
                ))}
              </motion.ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default NavMenu
